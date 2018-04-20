import {NgModule} from '@angular/core';
import {AngularEchartsModule} from 'ngx-echarts';

import {ThemeModule} from '../../@theme/theme.module';
import {DashboardComponent} from './dashboard.component';
import {StatusCardComponent} from './status-card/status-card.component';
import {ContactsComponent} from './contacts/contacts.component';
import {RoomsComponent} from './rooms/rooms.component';
import {RoomSelectorComponent} from './rooms/room-selector/room-selector.component';
import {TemperatureComponent} from './temperature/temperature.component';
import {TemperatureDraggerComponent} from './temperature/temperature-dragger/temperature-dragger.component';
import {TeamComponent} from './team/team.component';
import {KittenComponent} from './kitten/kitten.component';
import {SecurityCamerasComponent} from './security-cameras/security-cameras.component';
import {ElectricityComponent} from './electricity/electricity.component';
import {ElectricityChartComponent} from './electricity/electricity-chart/electricity-chart.component';
import {WeatherComponent} from './weather/weather.component';
import {SolarComponent} from './solar/solar.component';
import {PlayerComponent} from './rooms/player/player.component';
import {TrafficComponent} from './traffic/traffic.component';
import {TrafficChartComponent} from './traffic/traffic-chart.component';
import {NgxChartsModule} from "@swimlane/ngx-charts";
import {ChartModule} from "angular2-chartjs";
import {EchartsPieComponent} from "../charts/echarts/echarts-pie.component";
import {EchartsBarComponent} from "../charts/echarts/echarts-bar.component";
import {EchartsRadarComponent} from "../charts/echarts/echarts-radar.component";
import {EchartsBarAnimationComponent} from "../charts/echarts/echarts-bar-animation.component";
import {EchartsAreaStackComponent} from "../charts/echarts/echarts-area-stack.component";
import {EchartsMultipleXaxisComponent} from "../charts/echarts/echarts-multiple-xaxis.component";
import {EchartsLineComponent} from "../charts/echarts/echarts-line.component";
import {CategoryService} from "../../service/baseInformation/category.service";
import {ChartsModule} from "../charts/charts.module";
import { TicketService } from '../../service/chat/ticket.service';
import { NetService } from '../../service/net/net.service';

@NgModule({
  imports: [
    ThemeModule,
    AngularEchartsModule,
    NgxChartsModule

  ],
  declarations: [
    DashboardComponent,
    StatusCardComponent,
    TemperatureDraggerComponent,
    ContactsComponent,
    RoomSelectorComponent,
    TemperatureComponent,
    RoomsComponent,
    TeamComponent,
    KittenComponent,
    SecurityCamerasComponent,
    ElectricityComponent,
    ElectricityChartComponent,
    WeatherComponent,
    PlayerComponent,
    SolarComponent,
    TrafficComponent,
    TrafficChartComponent,
    EchartsPieComponent

  ],
  providers: [CategoryService,TicketService,NetService]
})
export class DashboardModule {
}
