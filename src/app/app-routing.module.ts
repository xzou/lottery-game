import { Routes, RouterModule } from '@angular/router';

import { NameComponent } from './name/name.component';
import { GameComponent } from './game/game.component';
import { InstructionsComponent } from './instructions/instructions.component';
import { QuizComponent } from './quiz/quiz.component';
import { OpponentSearchComponent } from './opponent-search/opponent-search.component';
import { CodeComponent } from './code/code.component';
import { PayoffComponent } from './payoff/payoff.component';
import { TerminationComponent } from './termination/termination.component';

import { IpRouteGuardService } from './ip-route-guard.service';

const routes: Routes = [
  { path: '', redirectTo: 'main', pathMatch: 'full' },
  { path: 'main', component: NameComponent, canActivate: [IpRouteGuardService] },
  { path: 'game', component: GameComponent },
  { path: 'instructions', component: InstructionsComponent },
  { path: 'quiz', component: QuizComponent },
  { path: 'players-search', component: OpponentSearchComponent },
  { path: 'code', component: CodeComponent },
  { path: 'payoff', component: PayoffComponent },
  { path: 'end', component: TerminationComponent }
];

export const AppRouterModule = RouterModule.forRoot(routes);
