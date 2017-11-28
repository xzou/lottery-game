import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import 'rxjs/add/operator/switchMap';

import { IpService } from './ip.service';
import { ParticipantService } from './participant/participant.service';

@Injectable()
export class IpRouteGuardService implements CanActivate {

  constructor(private ipService: IpService,
              private participantService: ParticipantService,
              private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.ipService.isNewIp().map(res => {
      if (res) {
        return true;
      } else {
        this.router.navigateByUrl('/end', { replaceUrl: true });
        return false;
      }
    }); 
  }
}
