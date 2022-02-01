import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
	{
		path: '',
		redirectTo: 'search',
		pathMatch: 'full'
	},
	{
		path: 'search',
		loadChildren: () =>
			import('./features/search/search.module').then(
				(m) => m.SearchModule
			)
	}
];

@NgModule({
	imports: [
		RouterModule.forRoot(routes, {
			scrollPositionRestoration: 'top'
		})
	],
	exports: [RouterModule]
})
export class AppRoutingModule {}
