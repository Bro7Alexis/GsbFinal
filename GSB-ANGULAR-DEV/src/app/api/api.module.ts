/* tslint:disable */
import { NgModule, ModuleWithProviders } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ApiConfiguration, ApiConfigurationInterface } from './api-configuration';

import { ApiService } from './services/api.service';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';
import { MedicamentsService } from './services/medicaments.service';
import { FacturesService } from './services/factures.service';
import { MeetingService } from './services/meeting.service';
import { OrderService } from './services/order.service';

/**
 * Provider for all Api services, plus ApiConfiguration
 */
@NgModule({
  imports: [
    HttpClientModule
  ],
  exports: [
    HttpClientModule
  ],
  declarations: [],
  providers: [
    ApiConfiguration,
    ApiService,
    AuthService,
    UserService,
    MedicamentsService,
    FacturesService,
    MeetingService,
    OrderService
  ],
})
export class ApiModule {
  static forRoot(customParams: ApiConfigurationInterface): ModuleWithProviders<ApiModule> {
    return {
      ngModule: ApiModule,
      providers: [
        {
          provide: ApiConfiguration,
          useValue: {rootUrl: customParams.rootUrl}
        }
      ]
    }
  }
}
