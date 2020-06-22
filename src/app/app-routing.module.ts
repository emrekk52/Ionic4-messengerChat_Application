import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'login-page',
    loadChildren: () => import('./login-page/login-page.module').then( m => m.LoginPagePageModule)
  },
  {
    path: 'register-page',
    loadChildren: () => import('./register-page/register-page.module').then( m => m.RegisterPagePageModule)
  },
  {
    path: 'edit-profile-page',
    loadChildren: () => import('./edit-profile-page/edit-profile-page.module').then( m => m.EditProfilePagePageModule)
  },
  {
    path: 'profil-page',
    loadChildren: () => import('./profil-page/profil-page.module').then( m => m.ProfilPagePageModule)
  },
  {
    path: 'message-page',
    loadChildren: () => import('./message-page/message-page.module').then( m => m.MessagePagePageModule)
  },
  {
    path: 'channel-page',
    loadChildren: () => import('./channel-page/channel-page.module').then( m => m.ChannelPagePageModule)
  },
  {
    path: 'search-user',
    loadChildren: () => import('./search-user/search-user.module').then( m => m.SearchUserPageModule)
  },
  {
    path: 'message-page',
    loadChildren: () => import('./message-page/message-page.module').then( m => m.MessagePagePageModule)
  },
  {
    path: 'user-profile-page',
    loadChildren: () => import('./user-profile-page/user-profile-page.module').then( m => m.UserProfilePagePageModule)
  },
  {
    path: 'full-screen',
    loadChildren: () => import('./full-screen/full-screen.module').then( m => m.FullScreenPageModule)
  },
  {
    path: 'story-page',
    loadChildren: () => import('./story-page/story-page.module').then( m => m.StoryPagePageModule)
  },
  {
    path: 'story-view',
    loadChildren: () => import('./story-view/story-view.module').then( m => m.StoryViewPageModule)
  },
  {
    path: 'story-seen',
    loadChildren: () => import('./story-seen/story-seen.module').then( m => m.StorySeenPageModule)
  },
  {
    path: 'message-photo-screen',
    loadChildren: () => import('./message-photo-screen/message-photo-screen.module').then( m => m.MessagePhotoScreenPageModule)
  },
  {
    path: 'camera-story',
    loadChildren: () => import('./camera-story/camera-story.module').then( m => m.CameraStoryPageModule)
  },
  {
    path: 'full-user-list',
    loadChildren: () => import('./full-user-list/full-user-list.module').then( m => m.FullUserListPageModule)
  }

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
