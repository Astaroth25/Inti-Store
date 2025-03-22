import { Injectable } from '@angular/core';
import { Banner } from '../Interfaces/banner';
import { filter } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BannerService {
  //Definicion de los recursos del banner.
  //Solo img o svg de 400px x 400px
  private banners: Banner[] = [
    {
      bannerId: 1,
      title: 'Banner promocional',
      imageRightUrl: 'Assets/rightBanner.svg',
      imageLeftUrl: 'Assets/leftBanner.svg',
    },
  ];

  //Métodos 
  getBanners(): Banner[]{
    return this.banners;
  }

  addBanner(banner:Banner):void{
    this.banners.push(banner);
  }

  deleteBanner(bannerId:number):void{
    this.banners = this.banners.filter(banner => banner.bannerId !== bannerId);
  }
}
