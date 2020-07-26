import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AccordionModule} from "ngx-bootstrap/accordion";
import {TooltipModule} from "ngx-bootstrap/tooltip";
import {ModalModule} from "ngx-bootstrap/modal";
import {PopoverModule} from "ngx-bootstrap/popover";
import {PaginationModule} from "ngx-bootstrap/pagination";
import {CarouselModule} from "ngx-bootstrap/carousel";

const ngxComponents = [
  CarouselModule.forRoot(),
  TooltipModule.forRoot(),
  ModalModule.forRoot(),
  PopoverModule.forRoot(),
  AccordionModule.forRoot(),
  PaginationModule.forRoot(),
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ngxComponents
  ],
  exports:[
    ngxComponents
  ]
})
export class NgxModule { }
