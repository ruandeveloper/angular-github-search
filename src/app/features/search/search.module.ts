import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from './pages/search/search.component';
import { SearchInputComponent } from './components/search-input/search-input.component';
import { UserCardComponent } from './components/user-card/user-card.component';
import { RepositoryCardComponent } from './components/repository-card/repository-card.component';
import { LanguageTagComponent } from './components/languages/languages.component';
import { TagsComponent } from './components/tags/tags.component';
import { SearchRoutingModule } from './search-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActionButtonsComponent } from './components/action-buttons/action-buttons.component';
import { CounterTagComponent } from './components/counter-tag/counter-tag.component';
import { AvatarUrlPipe } from './pipes/avatar-url.pipe';
import { UserLanguagesPipe } from './pipes/user-languages.pipe';
import { AutoSizeInputModule } from 'ngx-autosize-input';
import { SearchItemDialogComponent } from './dialogs/search-item-dialog/search-item-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { FollowersAvatarComponent } from './components/followers-avatar/followers-avatar.component';
import { UserRepositoriesComponent } from './components/user-repositories/user-repositories.component';

@NgModule({
  declarations: [
    SearchComponent,
    SearchInputComponent,
    UserCardComponent,
    RepositoryCardComponent,
    LanguageTagComponent,
    TagsComponent,
    ActionButtonsComponent,
    CounterTagComponent,
    AvatarUrlPipe,
    UserLanguagesPipe,
    SearchItemDialogComponent,
    FollowersAvatarComponent,
    UserRepositoriesComponent,
  ],
  imports: [
    CommonModule,
    SearchRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    AutoSizeInputModule,
    MatDialogModule,
  ],
})
export class SearchModule {}
