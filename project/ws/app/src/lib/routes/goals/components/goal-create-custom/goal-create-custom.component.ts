import { Component, OnInit, ViewChild, ElementRef } from '@angular/core'
import { NsGoal, NsContent, BtnGoalsService, NsAutoComplete } from '@sunbird-cb/collection'
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { TFetchStatus, EventService, ConfigurationsService, WsEvents } from '@sunbird-cb/utils'
import { MatSnackBar } from '@angular/material/snack-bar'
import { Router, ActivatedRoute } from '@angular/router'

@Component({
  selector: 'ws-app-goal-create-custom',
  templateUrl: './goal-create-custom.component.html',
  styleUrls: ['./goal-create-custom.component.scss'],
})
export class GoalCreateCustomComponent implements OnInit {
  @ViewChild('selectContent', { static: true })
  selectContentMessage!: ElementRef<any>
  @ViewChild('createGoalError', { static: true })
  createGoalErrorMessage!: ElementRef<any>
  @ViewChild('createGoalSuccess', { static: true })
  createGoalSuccessMessage!: ElementRef<any>
  @ViewChild('editGoalError', { static: true })
  editGoalErrorMessage!: ElementRef<any>
  @ViewChild('editGoalSuccess', { static: true })
  editGoalSuccessMessage!: ElementRef<any>

  suggestedDuration = 0
  EGoalTypes = NsGoal.EGoalTypes
  showShareGoalStep = false
  showContentError = false

  createGoalForm: FormGroup
  createGoalStatus: TFetchStatus = 'none'

  selectedContentIds: Set<string> = new Set()
  shareWithEmailIds: string[] | undefined = undefined
  chipNamesHash: { [id: string]: string } = {}

  mode: 'create' | 'edit' = 'create'
  editGoal: any | null = null
  fetchEditGoalStatus: TFetchStatus = 'none'
  isShareEnabled = false
  constructor(
    fb: FormBuilder,
    private events: EventService,
    private route: ActivatedRoute,
    private snackbar: MatSnackBar,
    private goalsSvc: BtnGoalsService,
    private router: Router,
    private configSvc: ConfigurationsService,
  ) {
    // TODO: get min/max length for some json
    this.createGoalForm = fb.group({
      name: [null, [Validators.required, Validators.minLength(10), Validators.maxLength(100)]],
      description: [null],
      duration: [null, [Validators.required, Validators.min(1), Validators.max(365)]],
      type: [NsGoal.EGoalTypes.USER],
    })
  }

  ngOnInit() {

    if (this.configSvc.restrictedFeatures) {
      this.isShareEnabled = !this.configSvc.restrictedFeatures.has('share')
    }

    this.mode = this.route.snapshot.data.mode || this.mode
    const preselected = this.route.snapshot.queryParamMap.get('preselected')
    const preselectedName = this.route.snapshot.queryParamMap.get('preselectedName')

    if (preselected) {
      this.selectedContentIds.add(preselected)
      this.chipNamesHash[preselected] = preselectedName || ''
    }
    if (this.mode === 'edit') {
      this.fetchEditGoalStatus = 'fetching'
      const type = this.route.snapshot.params.goalType
      const id = this.route.snapshot.params.goalId
      if (type === 'me') {
        this.goalsSvc.getUserGoal(id).subscribe((goals: any) => {
          this.editGoal = goals.result.content
          this.populateCurrentGoalValues()
        })
      } else {
        this.goalsSvc.getOthersGoals('isInIntranet').subscribe(goals => {
          this.editGoal = goals.find(goal => goal.id === id) || null
          this.populateCurrentGoalValues()
        })
      }
    }
  }

  updateUsers(users: NsAutoComplete.IUserAutoComplete[]) {
    if (Array.isArray(users)) {
      this.shareWithEmailIds = users.map(user => user.wid)
    }
  }

  populateCurrentGoalValues() {
    if (this.editGoal) {
      this.selectedContentIds = new Set<string>(this.editGoal.childNodes)
        ; (this.editGoal.contentProgress || this.editGoal.contents || []).forEach((content: any) => {
          this.chipNamesHash[content.identifier] = content.name
        })
      this.createGoalForm.setValue({
        name: this.editGoal.name,
        description: this.editGoal.description || '',
        duration: this.editGoal.duration || 1,
        type: this.editGoal.type || 'user',
      })
      this.fetchEditGoalStatus = 'done'
    } else {
      this.fetchEditGoalStatus = 'error'
    }
  }

  contentChanged(content: Partial<NsContent.IContentMinimal>, checked: boolean) {
    this.showContentError = false
    if (content && content.identifier) {
      if (checked) {
        this.selectedContentIds.add(content.identifier)
      } else {
        this.selectedContentIds.delete(content.identifier)
      }
    }
  }

  scroll(shareGoalStep: HTMLElement) {
    setTimeout(() => {
      shareGoalStep.scrollIntoView({ behavior: 'smooth' })
    },         100)
  }

  createGoal() {
    if (this.createGoalForm && !this.createGoalForm.valid) {
      this.createGoalForm.markAsTouched({ onlySelf: true })
      window.scroll(0, 0)
      return
    }

    if (!this.selectedContentIds.size) {
      // this.snackbar.open(this.selectContentMessage.nativeElement.value)
      this.showContentError = true
      return
    }

    const rawValues = this.createGoalForm.getRawValue()
    this.createGoalStatus = 'fetching'
    if (this.editGoal) {
      this.goalsSvc
        .updateGoal(this.editGoal.identifier, {
          id: (this.editGoal && this.editGoal.identifier) || undefined,
          name: rawValues.name,
          contentIds: Array.from(this.selectedContentIds),
          description: rawValues.description,
          duration: rawValues.duration,
          type: rawValues.type,
          versionKey: this.editGoal.versionKey,
        })
        .subscribe(
          () => {
            this.createGoalStatus = 'done'

            this.mode === 'create'
              ? this.snackbar.open(this.createGoalSuccessMessage.nativeElement.value)
              : this.snackbar.open(this.editGoalSuccessMessage.nativeElement.value)

            if (rawValues.type === NsGoal.EGoalTypes.USER) {
              this.router.navigate(['/app/goals/me'])
            } else {
              this.router.navigate(['/app/goals/others'])
            }
          },
          () => {
            this.createGoalStatus = 'error'
            this.mode === 'create'
              ? this.snackbar.open(this.createGoalErrorMessage.nativeElement.value)
              : this.snackbar.open(this.editGoalErrorMessage.nativeElement.value)
          },
        )
      this.raiseTelemetry(this.editGoal.identifier)
    } else {
      this.goalsSvc
        .createGoal({
          id: (this.editGoal && this.editGoal.identifier) || undefined,
          name: rawValues.name,
          contentIds: Array.from(this.selectedContentIds),
          description: rawValues.description,
          duration: rawValues.duration,
          type: rawValues.type,
        })
        .subscribe(
          () => {
            this.createGoalStatus = 'done'

            this.mode === 'create'
              ? this.snackbar.open(this.createGoalSuccessMessage.nativeElement.value)
              : this.snackbar.open(this.editGoalSuccessMessage.nativeElement.value)

            if (rawValues.type === NsGoal.EGoalTypes.USER) {
              this.router.navigate(['/app/goals/me'])
            } else {
              this.router.navigate(['/app/goals/others'])
            }
          },
          () => {
            this.createGoalStatus = 'error'
            this.mode === 'create'
              ? this.snackbar.open(this.createGoalErrorMessage.nativeElement.value)
              : this.snackbar.open(this.editGoalErrorMessage.nativeElement.value)
          },
        )
        this.raiseTelemetry(this.editGoal.identifier)
    }
  }

  raiseTelemetry(goalId: NsGoal.EGoalTypes) {
    this.events.raiseInteractTelemetry(
      {
        type: 'goal',
        subType: 'create',
        id: goalId,
      },
      {
        id: goalId,
      },
      {
        pageIdExt: 'create-goal',
        module: WsEvents.EnumTelemetrymodules.LEARN,
    })
  }
}
