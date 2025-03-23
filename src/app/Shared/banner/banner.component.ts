import { AfterViewInit, Component, inject } from '@angular/core';
import { BannerService } from '../../Services/banner.service';
import { BannerI } from '../../Interfaces/banner';

@Component({
  selector: 'app-banner',
  imports: [],
  templateUrl: './banner.component.html',
  styleUrl: './banner.component.css',
})
export class BannerComponent implements AfterViewInit {
  bannerService = inject(BannerService);
  banners: BannerI[] = [];
  
  constructor(){
    this.banners= this.bannerService.getBanners();
  }

  //Js para mover automaticamente el carousel
  ngAfterViewInit() {
    const carousel = document.getElementById('carousel');
    let currentIndex = 0;

    const autoplay = () => {
      currentIndex = (currentIndex + 1) % carousel!.children.length;
      carousel!.scrollTo({
        left: currentIndex * carousel!.clientWidth,
        behavior: 'smooth',
      });
    };

    setInterval(autoplay, 4000);
  }
}
