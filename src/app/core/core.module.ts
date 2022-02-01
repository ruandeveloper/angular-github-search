import { LayoutModule } from './../layout/layout.module';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GithubTokenInterceptor } from './interceptors/github-token.interceptor';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { GraphQLModule } from '../graphql.module';
import { ThemeService } from './services';
import { environment } from 'src/environments';
import { Theme } from './models';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    LayoutModule,
    FontAwesomeModule,
    GraphQLModule,
    HttpClientModule,
  ],
  exports: [LayoutModule],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: INICIALIZE_THEME_BUNDLE,
      deps: [ThemeService],
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: GithubTokenInterceptor,
      multi: true,
    },
  ],
})
export class CoreModule {}

export function INICIALIZE_THEME_BUNDLE(themeService: ThemeService) {
  return (): void => {
    const theme = localStorage.getItem('theme') as Theme;

    return themeService.changeTheme(
      theme ?? (environment.defaultTheme as Theme)
    );
  };
}
