export namespace NSContent {
  export type IContentType =
    | 'Learning Path'
    | 'Collection'
    | 'Course'
    | 'Resource'
    | 'Knowledge Artifact'
    | 'Knowledge Board'
    | 'Channel'
  export interface IContentMeta {
    accessPaths?: string[]
    identifier?: string
    transcoding: any
    bannerColor: string /*new*/
    name: string
    scoreType: string
    projectCode: string
    fileType: string
    description: string
    keywords: string[]
    additionalDownloadLink: string
    loadingMessage: string
    appIcon: string
    grayScaleAppIcon: string
    thumbnail: string
    contentLanguage: string[]
    plagScan: string
    mediaType: string
    subTitle: string
    contentDescription: string
    expiryDate: string
    locale: string
    isExternalCourse: boolean
    exclusiveContent: boolean
    courseType: 'Instructor-Led' | 'Self Paced'
    contentType: IContentType
    category: IContentType
    visibility: string
    posterImage: string
    language: string[]
    resourceType: string
    categoryType?: string
    introductoryVideo: string
    introductoryVideoIcon: string
    isInIntranet: boolean
    msArtifactDetails: IMsArtifacts[]
    idealScreenSize: string
    sourceShortName: string
    sourceName: string
    sourceUrl: string
    playgroundInstructions: string
    registrationInstructions: string
    playgroundResources: any[]
    sourceIconUrl: string
    contentIdAtSource: string
    contentUrlAtSource: string
    extractedTextForSearch: string
    transcript: string
    unit: string
    trackOwner: string
    isIframeSupported: 'Yes' | 'No' | 'MayBe'
    trackContacts: IAuthorDetails[]
    catalogPaths: string[]
    isExternal: boolean
    skills: ISkill[]
    learningObjective: string
    preRequisites: string
    interactivityLevel: string
    complexityLevel: string
    audience: string[]
    duration: number
    size: number
    mimeType: string
    minLexVersion: string
    minOsVersion: number
    os: string[]
    checksum: string
    downloadUrl: string
    artifactUrl: string
    pkgVersion: string
    developer: string
    license: string
    competencies: string
    attributions: string[]
    copyright: string[]
    creator: string
    creatorDetails: IAuthorDetails[]
    portalOwner: string
    creatorContacts: IAuthorDetails[]
    submitterDetails: IAuthorDetails
    me_averageInteractionsPerMin: number
    me_totalSessionsCount: number
    me_totalTimespent: number
    me_averageTimespentPerSession: number
    me_totalDevices: number
    me_totalInteractions: number
    me_averageSessionsPerDevice: number
    me_totalSideloads: number
    me_totalComments: number
    me_totalRatings: number
    me_totalDownloads: number
    me_averageRating: number
    publisher: string
    region: string
    publisherDetails: IAuthorDetails[]
    owner: string
    collaborators: string[]
    collaboratorsDetails: IAuthorDetails[]
    voiceCredits: string
    soundCredits: string
    imageCredits: string
    forkable: boolean
    translatable: boolean
    templateType: string
    domain: string
    versionCreatedBy: string
    versionDate: string
    versionKey: string
    lastUpdatedOn: string
    lastUpdatedBy: string
    status?: string
    releaseNotes: string
    certificationUrl: string
    preContents: IInternalReference[]
    postContents: IInternalReference[]
    systemRequirements: string[]
    softwareRequirements: IExternalReference[]
    etaTrack: string
    references: IExternalReference[]
    isStandAlone: boolean
    passPercentage: number
    isContentEditingDisabled: boolean
    isMetaEditingDisabled: boolean
    publicationId: string
    subTitles: ISubTitle[]
    isExternalCertificate: boolean
    concepts: IConcept[]
    collections: IDependentContent[]
    children: IContentMeta[]
    certificationList: any[]
    accessibility: string[]
    microsites: string[]
    comments: IComments[]
    stageIcons: string
    editorState: string
    hasAssessment: string
    isRejected: boolean
    resourceCategory: string[]
    customClassifiers: string[]
    clients: IClient[]
    body: string
    org: string[]
    dimension: string
    editors: IAuthorDetails[]
    equivalentCertifications: IInternalReference[]
    kArtifacts: IInternalReference[]
    learningTrack: string
    learningMode: string
    nodeType: string
    verifiers: IAuthorDetails[]
    studyMaterials: IInternalReference[]
    studyDuration: number
    sampleCertificates: IInternalReference[]
    creatorLogo: string
    creatorPosterImage: string
    creatorThumbnail: string
    maskedPhone: string
    rootOrgName: string
    subject: string[]
    channel: string
    updatedDate: string
    managedBy: string
    flagsValue: number
    id: string
    recoveryEmail: string
    profileVisibility: string
    updatedBy: string
    accesscode: string
    locationIds: string[]
    externalIds: string[]
    registryId: string
    rootOrgId: string
    prevUsedEmail: string
    firstName: string
    tncAcceptedOn: string
    phone: string
    dob: string
    grade: string[]
    currentLoginTime: string
    userType: string
    lastName: string
    gender: string
    roles: string[]
    prevUsedPhone: string
    stateValidated: boolean
    isDeleted: boolean
    organisations: IOrganisations[]
    countryCode: string
    maskedEmail: string
    tempPassword: string
    email: string
    rootOrg: IRootOrg
    profileSummary: string
    phoneVerified: boolean
    recoveryPhone: string
    userName: string
    userId: string
    lastLoginTime: string
    emailVerified: boolean
    framework: {}
    createdDate: string
    createdBy: string
    location: string
    tncAcceptedVersion: string
    primaryCategory: string
  }

  export interface IClient {
    name: string
    id: string
    displayName: string
  }

  export interface ILanguage {
    label: string
    srclang: string
  }

  export interface IAuthorDetails {
    id: string
    name: string
  }

  export interface IComments {
    date: string
    name: string
    email: string
    comment: string
    action: string
  }

  export interface ISubTitle {
    url: string
    label: string
    srclang: string
  }

  export interface IExternalReference {
    title: string
    url: string
  }

  export interface IInternalReference {
    name: string
    identifier: string
  }

  export interface IMsArtifacts {
    videoId: string
    channelId: string
  }

  export interface ICatalog {
    id: string
    type: string
    value: string
  }

  export interface ISkill {
    identifier: string
    category: string
    skill: string
    name: string
  }

  export interface IConcept {
    identifier: string
    name: string
    objectType: string
    relation: string
    description: string
    index: string
    status: string
    depth: string
    mimeType: string
    visibility: string
    compatibilityLevel: string
  }

  export interface IDependentContent {
    identifier: string
    name: string
    objectType: string
    relation: string
    description: string
    index: string
    status: string
    depth: string
    mimeType: string
    visibility: string
    compatibilityLevel: string
  }

  export interface IContentMetaV2 {
    id: string
    ver: string
    ts: string
    params: {
      resmsgid: string
      msgid: string
      status: string
      err?: string
      errmsg?: string
    },
    responseCode: string
    result: {
      content: IContentMeta
    }
  }

  export interface IOrganisations {
    updatedBy: string
    organisationId: string
    orgName: string
    addedByName: string
    addedBy: string
    roles: string[]
    approvedBy: string
    updatedDate: string
    approvaldate: string
    isDeleted: boolean
    parentOrgId: string
    hashTagId: string
    isRejected: boolean
    position: string
    id: string
    orgjoindate: string
    isApproved: boolean
    orgLeftDate: string
  }

  export interface IRootOrg {
    dateTime: string
    preferredLanguage: string
    keys: {}
    channel: string
    approvedBy: string
    description: string
    updatedDate: string
    addressId: string
    orgType: string
    provider: string
    orgCode: string
    locationId: string
    theme: string
    id: string
    isApproved: boolean
    communityId: string
    slug: string
    email: string
    isSSOEnabled: boolean
    thumbnail: string
    updatedBy: string
    orgName: string
    locationIds: string[]
    externalId: string
    isRootOrg: boolean
    rootOrgId: string
    imgUrl: string
    approvedDate: string
    orgTypeId: string
    homeUrl: string
    isDefault: boolean
    createdDate: string
    contactDetail: string
    parentOrgId: string
    createdBy: string
    hashTagId: string
    noOfMembers: string
    status: number
  }

}
