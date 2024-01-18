import { NsWidgetResolver } from '@sunbird-cb/resolver'
import { ROOT_WIDGET_CONFIG } from './collection.config'
// Components
import { BtnAppsComponent } from './btn-apps/btn-apps.component'
// Modules
import { AvatarPhotoModule } from './_common/avatar-photo/avatar-photo.module'
import { BtnAppsModule } from './btn-apps/btn-apps.module'
import { BtnCallComponent } from './btn-call/btn-call.component'
import { BtnCallModule } from './btn-call/btn-call.module'
import { BtnCatalogComponent } from './btn-catalog/btn-catalog.component'
import { BtnCatalogModule } from './btn-catalog/btn-catalog.module'
import { BtnChannelAnalyticsComponent } from './btn-channel-analytics/btn-channel-analytics.component'
import { BtnChannelAnalyticsModule } from './btn-channel-analytics/btn-channel-analytics.module'
import { BtnContentDownloadComponent } from './btn-content-download/btn-content-download.component'
import { BtnContentDownloadModule } from './btn-content-download/btn-content-download.module'
import { BtnContentFeedbackComponent } from './btn-content-feedback/btn-content-feedback.component'
import { BtnContentFeedbackModule } from './btn-content-feedback/btn-content-feedback.module'
import { BtnContentLikeComponent } from './btn-content-like/btn-content-like.component'
import { BtnContentLikeModule } from './btn-content-like/btn-content-like.module'
import { BtnContentMailMeComponent } from './btn-content-mail-me/btn-content-mail-me.component'
import { BtnContentMailMeModule } from './btn-content-mail-me/btn-content-mail-me.module'
import { BtnContentShareComponent } from './btn-content-share/btn-content-share.component'
import { BtnContentShareModule } from './btn-content-share/btn-content-share.module'
// import { BtnFeatureComponent } from './btn-feature/btn-feature.component'
// import { BtnFeatureModule } from './btn-feature/btn-feature.module'
import { BtnFullscreenComponent } from './btn-fullscreen/btn-fullscreen.component'
import { BtnFullscreenModule } from './btn-fullscreen/btn-fullscreen.module'
import { BtnGoalsComponent } from './btn-goals/btn-goals.component'
import { BtnGoalsModule } from './btn-goals/btn-goals.module'
import { BtnMailUserComponent } from './btn-mail-user/btn-mail-user.component'
import { BtnMailUserModule } from './btn-mail-user/btn-mail-user.module'
import { BtnPageBackComponent } from './btn-page-back/btn-page-back.component'
import { BtnPageBackNavModule } from './btn-page-back-nav/btn-page-back-nav.module'
import { BtnPageBackModule } from './btn-page-back/btn-page-back.module'
import { BtnPlaylistComponent } from './btn-playlist/btn-playlist.component'
import { BtnPlaylistModule } from './btn-playlist/btn-playlist.module'
import { BtnPreviewComponent } from './btn-preview/btn-preview.component'
import { BtnPreviewModule } from './btn-preview/btn-preview.module'
import { BtnProfileComponent } from './btn-profile/btn-profile.component'
import { BtnProfileModule } from './btn-profile/btn-profile.module'
import { BtnSettingsComponent } from './btn-settings/btn-settings.component'
import { BtnSettingsModule } from './btn-settings/btn-settings.module'
import { CardBreadcrumbComponent } from './card-breadcrumb/card-breadcrumb.component'
import { CardBreadcrumbModule } from './card-breadcrumb/card-breadcrumb.module'
import { CardChannelComponent } from './card-channel/card-channel.component'
import { CardChannelModule } from './card-channel/card-channel.module'
// import { CardContentComponent } from './card-content/card-content.component'
// import { CardContentModule } from './card-content/card-content.module'
import { CardLearnComponent } from './card-learn/card-learn.component'
import { CardLearnModule } from './card-learn/card-learn.module'
import { CardWelcomeComponent } from './card-welcome/card-welcome.component'
import { CardNetworkComponent } from './card-network/card-network.component'
import { CardHubsListComponent } from './card-hubs-list/card-hubs-list.component'
import { CardWelcomeModule } from './card-welcome/card-welcome.module'
import { CardNetworkModule } from './card-network/card-network.module'
import { CardHomeNetworkModule } from './card-home-network/card-home-network.module'
import { CardHomeTopModule } from './card-home-top/card-home-top.module'
import { CardBrowseCourseModule } from './card-browse-course/card-browse-course.module'
import { CardHomeDiscussModule } from './card-home-discuss/card-home-discuss.module'
import { ChannelHubComponent } from './channel-hub/channel-hub.component'
import { ChannelHubModule } from './channel-hub/channel-hub.module'

import { ContentStripMultipleComponent } from './content-strip-multiple/content-strip-multiple.component'
import { ContentStripNewMultipleComponent } from './content-strip-new-multiple/content-strip-new-multiple.component'
import { ContentStripMultipleModule } from './content-strip-multiple/content-strip-multiple.module'
import { ContentStripNewMultipleModule } from './content-strip-new-multiple/content-strip-new-multiple.module'
import { ContentStripSingleComponent } from './content-strip-single/content-strip-single.component'
import { ContentStripSingleModule } from './content-strip-single/content-strip-single.module'
import { DiscussionForumComponent } from './discussion-forum/components/discussion-forum/discussion-forum.component'
import { DiscussionForumModule } from './discussion-forum/discussion-forum.module'
import { ElementHtmlComponent } from './element-html/element-html.component'
import { ElementHtmlModule } from './element-html/element-html.module'
import { EmbeddedPageComponent } from './embedded-page/embedded-page.component'
import { EmbeddedPageModule } from './embedded-page/embedded-page.module'
import { ErrorResolverComponent } from './error-resolver/error-resolver.component'
import { ErrorResolverModule } from './error-resolver/error-resolver.module'
import { GalleryViewComponent } from './gallery-view/gallery-view.component'
import { GalleryViewModule } from './gallery-view/gallery-view.module'
import { GraphGeneralComponent } from './graph-general/graph-general.component'
import { GraphGeneralModule } from './graph-general/graph-general.module'
import { GridLayoutComponent } from './grid-layout/grid-layout.component'
import { GridLayoutModule } from './grid-layout/grid-layout.module'
import { ImageMapResponsiveComponent } from './image-map-responsive/image-map-responsive.component'
import { ImageMapResponsiveModule } from './image-map-responsive/image-map-responsive.module'
import { IntranetSelectorComponent } from './intranet-selector/intranet-selector.component'
import { IntranetSelectorModule } from './intranet-selector/intranet-selector.module'
import { LayoutLinearComponent } from './layout-linear/layout-linear.component'
import { LayoutLinearModule } from './layout-linear/layout-linear.module'
import { LayoutTabComponent } from './layout-tab/layout-tab.component'
import { LayoutTabModule } from './layout-tab/layout-tab.module'
import { NetworkStripMultipleModule } from './network-strip-multiple/network-strip-multiple.module'
import { CarrierStripMultipleModule } from './carrier-strip-multiple/carrier-strip-multiple.module'
// import { ActivityStripMultipleModule } from './activity-strip-multiple/activity-strip-multiple.module'
import { NetworkStripMultipleComponent } from './network-strip-multiple/network-strip-multiple.component'
// import { ActivityStripMultipleComponent } from './activity-strip-multiple/activity-strip-multiple.component'
import { PageComponent } from './page/page.component'
import { PageModule } from './page/page.module'
import { ProfileAcademicsComponent } from './profile-v2/profile-academics/profile-academics.component'
import { ProfileAcademicsModule } from './profile-v2/profile-academics/profile-academics.module'
import { ProfileCareerComponent } from './profile-v2/profile-career/profile-career.component'
import { ProfileCareerModule } from './profile-v2/profile-career/profile-career.module'
import { ProfileCompetenciesComponent } from './profile-v2/profile-competencies/profile-competencies.component'
import { ProfileCompetenciesModule } from './profile-v2/profile-competencies/profile-competencies.module'
import { ProfileCretificationsComponent } from './profile-v2/profile-cretifications/profile-cretifications.component'
import { ProfileCretificationsModule } from './profile-v2/profile-cretifications/profile-cretifications.module'
import { ProfileCretificationsV2Component } from './profile-v2/profile-cretifications-v2/profile-cretifications-v2.component'
import { ProfileCretificationsV2Module } from './profile-v2/profile-cretifications-v2/profile-cretifications-v2.module'

import { ProfileDepartmentsComponent } from './profile-v2/profile-departments/profile-departments.component'
import { ProfileDepartmentsModule } from './profile-v2/profile-departments/profile-departments.module'
import { ProfileHobbiesModule } from './profile-v2/profile-hobbies/profile-hobbies.module'
import { ProfileHobbiesComponent } from './profile-v2/profile-hobbies/profile-hobbies.component'
import { PickerContentModule } from './picker-content/picker-content.module'
import { PlayerAmpComponent } from './player-amp/player-amp.component'
import { PlayerAmpModule } from './player-amp/player-amp.module'
import { PlayerAudioComponent } from './player-audio/player-audio.component'
import { PlayerAudioModule } from './player-audio/player-audio.module'
import { PlayerPdfComponent } from './player-pdf/player-pdf.component'
import { PlayerPdfModule } from './player-pdf/player-pdf.module'
import { PlayerOfflineSessionComponent } from './player-offline-session/player-offline-session.component'
import { PlayerOfflineSessionModule } from './player-offline-session/player-offline-session.module'
import { PlayerSlidesComponent } from './player-slides/player-slides.component'
import { PlayerSlidesModule } from './player-slides/player-slides.module'
import { PlayerVideoComponent } from './player-video/player-video.component'
import { PlayerVideoModule } from './player-video/player-video.module'
import { PlayerWebPagesComponent } from './player-web-pages/player-web-pages.component'
import { PlayerWebPagesModule } from './player-web-pages/player-web-pages.module'
import { PlayerYoutubeComponent } from './player-youtube/player-youtube.component'
import { PlayerYoutubeModule } from './player-youtube/player-youtube.module'
import { ReleaseNotesComponent } from './release-notes/release-notes.component'
import { ReleaseNotesModule } from './release-notes/release-notes.module'
import { SelectorResponsiveComponent } from './selector-responsive/selector-responsive.component'
import { SelectorResponsiveModule } from './selector-responsive/selector-responsive.module'
import { SlidersMobComponent } from './sliders-mob/sliders-mob.component'
import { SlidersMobModule } from './sliders-mob/sliders-mob.module'
import { SlidersComponent } from './sliders/sliders.component'
import { SlidersModule } from './sliders/sliders.module'
import { TreeCatalogComponent } from './tree-catalog/tree-catalog.component'
import { TreeCatalogModule } from './tree-catalog/tree-catalog.module'
import { TreeComponent } from './tree/tree.component'
import { TreeModule } from './tree/tree.module'
import { VideoWrapperComponent } from './video-wrapper/video-wrapper.component'
import { VideoWrapperModule } from './video-wrapper/video-wrapper.module'
// import { ContentStripVerticalModule } from './content-strip-vertical/content-strip-vertical.module'
// import { ContentStripVerticalComponent } from './content-strip-vertical/content-strip-vertical.component'
import { CardNetworkHomeComponent } from './card-network-home/card-network-home.component'
import { CardHomeDiscussComponent } from './card-home-discuss/card-home-discuss.component'
import { CardBrowseCourseComponent } from './card-browse-course/card-browse-course.component'
import { CardHubsListModule } from './card-hubs-list/card-hubs-list.module'
import { CardNotifyModule } from './card-notify/card-notify.module'
import { CardNetworkHomeModule } from './card-network-home/card-network-home.module'
import { CardCourseComponent } from './card-course/card-course.component'
import { CardCourseModule } from './card-course/card-course.module'
import { CardCarrierHomeComponent } from './card-carrier-home/card-carrier-home.component'
import { CardCarrierHomeModule } from './card-carrier-home/card-carrier-home.module'
import { CarrierStripMultipleComponent } from './carrier-strip-multiple/carrier-strip-multiple.component'
import { DiscussStripMultipleComponent } from './discuss-strip-multiple/discuss-strip-multiple.component'
import { DiscussStripMultipleModule } from './discuss-strip-multiple/discuss-strip-multiple.module'
import { CardActivityComponent } from './card-activity/card-activity.component'
import { CardActivityModule } from './card-activity/card-activity.module'
import { BtnFeatureComponent } from './btn-feature/btn-feature.component'
import { BtnFeatureModule } from './btn-feature/btn-feature.module'
// import { ContentQualityCheckModule } from './content-quality-check/content-quality-check.module'
import { UIAdminTableModule } from './ui-admin-table/ui-admin-table.module'

import { LeftMenuModule } from './left-menu/left-menu.module'
import { LeftMenuComponent } from './left-menu/left-menu.component'
import { UIORGTableModule } from './ui-org-table/ui-org-table.module'

import { BreadcrumbsOrgModule } from './breadcrumbs-org/breadcrumbs-org.module'
import { CardNotifyComponent } from './card-notify/card-notify.component'
import { PlayerSurveyComponent } from './player-survey/player-survey.component'
import { PlayerSurveyModule } from './player-survey/player-survey.module'
import { CardContentV2Component } from './card-content-v2/card-content-v2.component'
import { CardContentV2Module } from './card-content-v2/card-content-v2.module'
import { ContentStripWithTabsComponent } from './content-strip-with-tabs/content-strip-with-tabs.component'
import { ProfileKarmapointsModule } from './profile-v2/profile-karmapoints/profile-karmapoints.module'
import { ProfileKarmapointsComponent } from './profile-v2/profile-karmapoints/profile-karmapoints.component'
import { CardEventHubComponent } from './card-event-hub/card-event-hub.component'
import { CardEventHubModule } from './card-event-hub/card-event-hub.module'

export const WIDGET_REGISTERED_MODULES = [
  AvatarPhotoModule,
  BtnAppsModule,
  BtnCallModule,
  BtnCatalogModule,
  BtnChannelAnalyticsModule,
  BtnContentDownloadModule,
  BtnContentFeedbackModule,
  BtnContentLikeModule,
  BtnContentMailMeModule,
  BtnContentShareModule,
  BtnFullscreenModule,
  BtnGoalsModule,
  BtnMailUserModule,
  BtnPageBackNavModule,
  BtnPageBackModule,
  BtnPlaylistModule,
  BtnPreviewModule,
  BtnProfileModule,
  BtnSettingsModule,
  CardBreadcrumbModule,
  // CardContentModule,
  CardContentV2Module,
  CardChannelModule,
  CardLearnModule,
  CardWelcomeModule,
  CardNetworkModule,
  ChannelHubModule,
  CardHomeNetworkModule,
  CardHomeTopModule,
  CardBrowseCourseModule,
  CardHomeDiscussModule,
  ContentStripMultipleModule,
  ContentStripNewMultipleModule,
  ContentStripSingleModule,
  // ContentStripVerticalModule,
  GraphGeneralModule,
  LayoutLinearModule,
  LayoutTabModule,
  NetworkStripMultipleModule,
  PickerContentModule,
  PlayerAmpModule,
  PlayerAudioModule,
  PlayerPdfModule,
  PlayerOfflineSessionModule,
  PlayerSurveyModule,
  PlayerSlidesModule,
  PlayerVideoModule,
  PlayerWebPagesModule,
  PlayerYoutubeModule,
  ReleaseNotesModule,
  SlidersModule,
  ElementHtmlModule,
  TreeModule,
  TreeCatalogModule,
  PageModule,
  ProfileAcademicsModule,
  ProfileCareerModule,
  ProfileCompetenciesModule,
  ProfileCretificationsModule,
  ProfileCretificationsV2Module,
  ProfileDepartmentsModule,
  ProfileHobbiesModule,
  ProfileKarmapointsModule,
  EmbeddedPageModule,
  SelectorResponsiveModule,
  DiscussionForumModule,
  GridLayoutModule,
  ErrorResolverModule,
  BtnFeatureModule,
  GalleryViewModule,
  ImageMapResponsiveModule,
  IntranetSelectorModule,
  VideoWrapperModule,
  SlidersMobModule,
  CardHubsListModule,
  CardNotifyModule,
  CardNetworkHomeModule,
  CardCourseModule,
  CardCarrierHomeModule,
  CarrierStripMultipleModule,
  DiscussStripMultipleModule,
  CardActivityModule,
  // ActivityStripMultipleModule,
  UIAdminTableModule,
  LeftMenuModule,
  UIORGTableModule,
  BreadcrumbsOrgModule,
  CardEventHubModule,
]

export const WIDGET_REGISTRATION_CONFIG: NsWidgetResolver.IRegistrationConfig[] = [
  {
    widgetType: ROOT_WIDGET_CONFIG.actionButton._type,
    widgetSubType: ROOT_WIDGET_CONFIG.actionButton.apps,
    component: BtnAppsComponent,
  },
  {
    widgetType: ROOT_WIDGET_CONFIG.actionButton._type,
    widgetSubType: ROOT_WIDGET_CONFIG.actionButton.call,
    component: BtnCallComponent,
  },
  {
    widgetType: ROOT_WIDGET_CONFIG.actionButton._type,
    widgetSubType: ROOT_WIDGET_CONFIG.actionButton.catalog,
    component: BtnCatalogComponent,
  },
  {
    widgetType: ROOT_WIDGET_CONFIG.actionButton._type,
    widgetSubType: ROOT_WIDGET_CONFIG.actionButton.channelAnalytics,
    component: BtnChannelAnalyticsComponent,
  },
  {
    widgetType: ROOT_WIDGET_CONFIG.actionButton._type,
    widgetSubType: ROOT_WIDGET_CONFIG.actionButton.contentDownload,
    component: BtnContentDownloadComponent,
  },
  {
    widgetType: ROOT_WIDGET_CONFIG.actionButton._type,
    widgetSubType: ROOT_WIDGET_CONFIG.actionButton.contentFeedback,
    component: BtnContentFeedbackComponent,
  },
  {
    widgetType: ROOT_WIDGET_CONFIG.actionButton._type,
    widgetSubType: ROOT_WIDGET_CONFIG.actionButton.contentLike,
    component: BtnContentLikeComponent,
  },
  {
    widgetType: ROOT_WIDGET_CONFIG.actionButton._type,
    widgetSubType: ROOT_WIDGET_CONFIG.actionButton.contentMailMe,
    component: BtnContentMailMeComponent,
  },
  {
    widgetType: ROOT_WIDGET_CONFIG.actionButton._type,
    widgetSubType: ROOT_WIDGET_CONFIG.actionButton.contentShare,
    component: BtnContentShareComponent,
  },
  {
    widgetType: ROOT_WIDGET_CONFIG.actionButton._type,
    widgetSubType: ROOT_WIDGET_CONFIG.actionButton.fullscreen,
    component: BtnFullscreenComponent,
  },
  {
    widgetType: ROOT_WIDGET_CONFIG.actionButton._type,
    widgetSubType: ROOT_WIDGET_CONFIG.actionButton.goals,
    component: BtnGoalsComponent,
  },
  {
    widgetType: ROOT_WIDGET_CONFIG.actionButton._type,
    widgetSubType: ROOT_WIDGET_CONFIG.actionButton.mailUser,
    component: BtnMailUserComponent,
  },
  {
    widgetType: ROOT_WIDGET_CONFIG.actionButton._type,
    widgetSubType: ROOT_WIDGET_CONFIG.actionButton.pageBack,
    component: BtnPageBackComponent,
  },
  {
    widgetType: ROOT_WIDGET_CONFIG.actionButton._type,
    widgetSubType: ROOT_WIDGET_CONFIG.actionButton.playlist,
    component: BtnPlaylistComponent,
  },
  {
    widgetType: ROOT_WIDGET_CONFIG.actionButton._type,
    widgetSubType: ROOT_WIDGET_CONFIG.actionButton.preview,
    component: BtnPreviewComponent,
  },
  {
    widgetType: ROOT_WIDGET_CONFIG.actionButton._type,
    widgetSubType: ROOT_WIDGET_CONFIG.actionButton.newProfile,
    component: BtnProfileComponent,
  },
  {
    widgetType: ROOT_WIDGET_CONFIG.actionButton._type,
    widgetSubType: ROOT_WIDGET_CONFIG.actionButton.setting,
    component: BtnSettingsComponent,
  },

  {
    widgetType: ROOT_WIDGET_CONFIG.card._type,
    widgetSubType: ROOT_WIDGET_CONFIG.card.breadcrumb,
    component: CardBreadcrumbComponent,
  },
  {
    widgetType: ROOT_WIDGET_CONFIG.card._type,
    widgetSubType: ROOT_WIDGET_CONFIG.card.channel,
    component: CardChannelComponent,
  },
  // {
  //   widgetType: ROOT_WIDGET_CONFIG.card._type,
  //   widgetSubType: ROOT_WIDGET_CONFIG.card.content,
  //   component: CardContentComponent,
  // },
  {
    widgetType: ROOT_WIDGET_CONFIG.card._type,
    widgetSubType: ROOT_WIDGET_CONFIG.card.content,
    component: CardContentV2Component,
  },
  {
    widgetType: ROOT_WIDGET_CONFIG.card._type,
    widgetSubType: ROOT_WIDGET_CONFIG.card.learning,
    component: CardLearnComponent,
  },
  {
    widgetType: ROOT_WIDGET_CONFIG.card._type,
    widgetSubType: ROOT_WIDGET_CONFIG.card.welcome,
    component: CardWelcomeComponent,
  },
  {
    widgetType: ROOT_WIDGET_CONFIG.card._type,
    widgetSubType: ROOT_WIDGET_CONFIG.card.network,
    component: CardNetworkComponent,
  },
  {
    widgetType: ROOT_WIDGET_CONFIG.card._type,
    widgetSubType: ROOT_WIDGET_CONFIG.card.home_activity,
    component: CardActivityComponent,
  },
  {
    widgetType: ROOT_WIDGET_CONFIG.card._type,
    widgetSubType: ROOT_WIDGET_CONFIG.card.browse_course,
    component: CardBrowseCourseComponent,
  },
  {
    widgetType: ROOT_WIDGET_CONFIG.card._type,
    widgetSubType: ROOT_WIDGET_CONFIG.card.home_network,
    component: CardNetworkHomeComponent,
  },
  {
    widgetType: ROOT_WIDGET_CONFIG.card._type,
    widgetSubType: ROOT_WIDGET_CONFIG.card.home_discuss,
    component: CardHomeDiscussComponent,
  },
  {
    widgetType: ROOT_WIDGET_CONFIG.channelHub._type,
    widgetSubType: ROOT_WIDGET_CONFIG.channelHub.channelHub,
    component: ChannelHubComponent,
  },
  {
    widgetType: ROOT_WIDGET_CONFIG.contentStrip._type,
    widgetSubType: ROOT_WIDGET_CONFIG.contentStrip.multiStrip,
    component: ContentStripMultipleComponent,
  },
  {
    widgetType: ROOT_WIDGET_CONFIG.contentStrip._type,
    widgetSubType: ROOT_WIDGET_CONFIG.contentStrip.multiStripNew,
    component: ContentStripNewMultipleComponent,
  },
  {
    widgetType: ROOT_WIDGET_CONFIG.contentStrip._type,
    widgetSubType: ROOT_WIDGET_CONFIG.contentStrip.stripWithTabs,
    component: ContentStripWithTabsComponent,
  },
  // {
  //   widgetType: ROOT_WIDGET_CONFIG.contentStrip._type,
  //   widgetSubType: ROOT_WIDGET_CONFIG.contentStrip.verticalStrip,
  //   component: ContentStripVerticalComponent,
  // },
  {
    widgetType: ROOT_WIDGET_CONFIG.contentStrip._type,
    widgetSubType: ROOT_WIDGET_CONFIG.contentStrip.singleStrip,
    component: ContentStripSingleComponent,
  },
  {
    widgetType: ROOT_WIDGET_CONFIG.graph._type,
    widgetSubType: ROOT_WIDGET_CONFIG.graph.graphGeneral,
    component: GraphGeneralComponent,
  },
  {
    widgetType: ROOT_WIDGET_CONFIG.layout._type,
    widgetSubType: ROOT_WIDGET_CONFIG.layout.linear,
    component: LayoutLinearComponent,
  },
  {
    widgetType: ROOT_WIDGET_CONFIG.layout._type,
    widgetSubType: ROOT_WIDGET_CONFIG.layout.tab,
    component: LayoutTabComponent,
  },
  {
    widgetType: ROOT_WIDGET_CONFIG.discussStrip._type,
    widgetSubType: ROOT_WIDGET_CONFIG.discussStrip.multipleStrip,
    component: DiscussStripMultipleComponent,
  },
  {
    widgetType: ROOT_WIDGET_CONFIG.networkStrip._type,
    widgetSubType: ROOT_WIDGET_CONFIG.networkStrip.multipleStrip,
    component: NetworkStripMultipleComponent,
  },
  // {
  //   widgetType: ROOT_WIDGET_CONFIG.activityStrip._type,
  //   widgetSubType: ROOT_WIDGET_CONFIG.activityStrip.multipleStrip,
  //   component: ActivityStripMultipleComponent,
  // },
  {
    widgetType: ROOT_WIDGET_CONFIG.carrierStrip._type,
    widgetSubType: ROOT_WIDGET_CONFIG.carrierStrip.multipleStrip,
    component: CarrierStripMultipleComponent,
  },
  {
    widgetType: ROOT_WIDGET_CONFIG.player._type,
    widgetSubType: ROOT_WIDGET_CONFIG.player.amp,
    component: PlayerAmpComponent,
  },
  {
    widgetType: ROOT_WIDGET_CONFIG.player._type,
    widgetSubType: ROOT_WIDGET_CONFIG.player.audio,
    component: PlayerAudioComponent,
  },
  {
    widgetType: ROOT_WIDGET_CONFIG.player._type,
    widgetSubType: ROOT_WIDGET_CONFIG.player.pdf,
    component: PlayerPdfComponent,
  },
  {
    widgetType: ROOT_WIDGET_CONFIG.player._type,
    widgetSubType: ROOT_WIDGET_CONFIG.player.survey,
    component: PlayerSurveyComponent,
  },
  {
    widgetType: ROOT_WIDGET_CONFIG.player._type,
    widgetSubType: ROOT_WIDGET_CONFIG.player.offlineSession,
    component: PlayerOfflineSessionComponent,
  },
  {
    widgetType: ROOT_WIDGET_CONFIG.player._type,
    widgetSubType: ROOT_WIDGET_CONFIG.player.slides,
    component: PlayerSlidesComponent,
  },
  {
    widgetType: ROOT_WIDGET_CONFIG.player._type,
    widgetSubType: ROOT_WIDGET_CONFIG.player.video,
    component: PlayerVideoComponent,
  },
  {
    widgetType: ROOT_WIDGET_CONFIG.player._type,
    widgetSubType: ROOT_WIDGET_CONFIG.player.webPages,
    component: PlayerWebPagesComponent,
  },
  {
    widgetType: ROOT_WIDGET_CONFIG.player._type,
    widgetSubType: ROOT_WIDGET_CONFIG.player.youtube,
    component: PlayerYoutubeComponent,
  },
  {
    widgetType: ROOT_WIDGET_CONFIG.releaseNotes._type,
    widgetSubType: ROOT_WIDGET_CONFIG.releaseNotes.user,
    component: ReleaseNotesComponent,
  },
  {
    widgetType: ROOT_WIDGET_CONFIG.slider._type,
    widgetSubType: ROOT_WIDGET_CONFIG.slider.carousel,
    component: SlidersComponent,
  },
  {
    widgetType: ROOT_WIDGET_CONFIG.slider._type,
    widgetSubType: ROOT_WIDGET_CONFIG.slider.mob,
    component: SlidersMobComponent,
  },
  {
    widgetType: ROOT_WIDGET_CONFIG.tree._type,
    widgetSubType: ROOT_WIDGET_CONFIG.tree.tree,
    component: TreeComponent,
  },
  {
    widgetType: ROOT_WIDGET_CONFIG.tree._type,
    widgetSubType: ROOT_WIDGET_CONFIG.tree.catalog,
    component: TreeCatalogComponent,
  },
  {
    widgetType: ROOT_WIDGET_CONFIG.page._type,
    widgetSubType: ROOT_WIDGET_CONFIG.page.standard,
    component: PageComponent,
  },
  {
    widgetType: ROOT_WIDGET_CONFIG.profileV2._type,
    widgetSubType: ROOT_WIDGET_CONFIG.profileV2.academics,
    component: ProfileAcademicsComponent,
  },
  {
    widgetType: ROOT_WIDGET_CONFIG.profileV2._type,
    widgetSubType: ROOT_WIDGET_CONFIG.profileV2.karmapoints,
    component: ProfileKarmapointsComponent,
  },
  {
    widgetType: ROOT_WIDGET_CONFIG.profileV2._type,
    widgetSubType: ROOT_WIDGET_CONFIG.profileV2.career,
    component: ProfileCareerComponent,
  },
  {
    widgetType: ROOT_WIDGET_CONFIG.profileV2._type,
    widgetSubType: ROOT_WIDGET_CONFIG.profileV2.competencies,
    component: ProfileCompetenciesComponent,
  },
  {
    widgetType: ROOT_WIDGET_CONFIG.profileV2._type,
    widgetSubType: ROOT_WIDGET_CONFIG.profileV2.certifications,
    component: ProfileCretificationsComponent,
  },
  {
    widgetType: ROOT_WIDGET_CONFIG.profileV2._type,
    widgetSubType: ROOT_WIDGET_CONFIG.profileV2.certificationsV2,
    component: ProfileCretificationsV2Component,
  },
  {
    widgetType: ROOT_WIDGET_CONFIG.profileV2._type,
    widgetSubType: ROOT_WIDGET_CONFIG.profileV2.hobbies,
    component: ProfileHobbiesComponent,
  },
  {
    widgetType: ROOT_WIDGET_CONFIG.profileV2._type,
    widgetSubType: ROOT_WIDGET_CONFIG.profileV2.departments,
    component: ProfileDepartmentsComponent,
  },
  {
    widgetType: ROOT_WIDGET_CONFIG.page._type,
    widgetSubType: ROOT_WIDGET_CONFIG.page.embedded,
    component: EmbeddedPageComponent,
  },
  {
    widgetType: ROOT_WIDGET_CONFIG.element._type,
    widgetSubType: ROOT_WIDGET_CONFIG.element.html,
    component: ElementHtmlComponent,
  },

  {
    widgetType: ROOT_WIDGET_CONFIG.selector._type,
    widgetSubType: ROOT_WIDGET_CONFIG.selector.responsive,
    component: SelectorResponsiveComponent,
  },
  {
    widgetType: ROOT_WIDGET_CONFIG.discussionForum._type,
    widgetSubType: ROOT_WIDGET_CONFIG.discussionForum.discussionForum,
    component: DiscussionForumComponent,
  },
  {
    widgetType: ROOT_WIDGET_CONFIG.layout._type,
    widgetSubType: ROOT_WIDGET_CONFIG.layout.grid,
    component: GridLayoutComponent,
  },
  {
    widgetType: ROOT_WIDGET_CONFIG.errorResolver._type,
    widgetSubType: ROOT_WIDGET_CONFIG.errorResolver.errorResolver,
    component: ErrorResolverComponent,
  },
  {
    widgetType: ROOT_WIDGET_CONFIG.actionButton._type,
    widgetSubType: ROOT_WIDGET_CONFIG.actionButton.feature,
    component: BtnFeatureComponent,
  },
  {
    widgetType: ROOT_WIDGET_CONFIG.gallery._type,
    widgetSubType: ROOT_WIDGET_CONFIG.gallery.galleryView,
    component: GalleryViewComponent,
  },
  {
    widgetType: ROOT_WIDGET_CONFIG.imageMap._type,
    widgetSubType: ROOT_WIDGET_CONFIG.imageMap.imageMapResponsive,
    component: ImageMapResponsiveComponent,
  },
  {
    widgetType: ROOT_WIDGET_CONFIG.selector._type,
    widgetSubType: ROOT_WIDGET_CONFIG.selector.intranet,
    component: IntranetSelectorComponent,
  },
  {
    widgetType: ROOT_WIDGET_CONFIG.wrapper._type,
    widgetSubType: ROOT_WIDGET_CONFIG.wrapper.videoWrapper,
    component: VideoWrapperComponent,
  },
  {
    widgetType: ROOT_WIDGET_CONFIG.card._type,
    widgetSubType: ROOT_WIDGET_CONFIG.card.home_hubs,
    component: CardHubsListComponent,
  },
  {
    widgetType: ROOT_WIDGET_CONFIG.card._type,
    widgetSubType: ROOT_WIDGET_CONFIG.card.home_notify,
    component: CardNotifyComponent,
  },
  {
    widgetType: ROOT_WIDGET_CONFIG.card._type,
    widgetSubType: ROOT_WIDGET_CONFIG.card.home_course,
    component: CardCourseComponent,
  },
  {
    widgetType: ROOT_WIDGET_CONFIG.card._type,
    widgetSubType: ROOT_WIDGET_CONFIG.card.home_carrier,
    component: CardCarrierHomeComponent,
  },
  {
    widgetType: ROOT_WIDGET_CONFIG.menus._type,
    widgetSubType: ROOT_WIDGET_CONFIG.menus.leftMenu,
    component: LeftMenuComponent,
  },
  {
    widgetType: ROOT_WIDGET_CONFIG.card._type,
    widgetSubType: ROOT_WIDGET_CONFIG.card.event_hub,
    component: CardEventHubComponent,
  },
]
