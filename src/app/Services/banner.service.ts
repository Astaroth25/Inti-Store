import { Injectable } from '@angular/core';
import { BannerI } from '../Interfaces/banner';

@Injectable({
  providedIn: 'root',
})
export class BannerService {
  //Definicion de los recursos del banner.
  //Solo img o svg de 400px x 400px
  private banners: BannerI[] = [
    {
      bannerId: 1,
      title: 'Banner promocional',
      imageRightUrl: 'https://raw.githubusercontent.com/Astaroth25/Assets-Inti-Store/refs/heads/main/rightBanner.svg',
      imageLeftUrl: 'https://raw.githubusercontent.com/Astaroth25/Assets-Inti-Store/refs/heads/main/leftBanner.svg',
    },
  ];

  //Métodos 
  getBanners(): BannerI[]{
    return this.banners;
  }

  addBanner(banner:BannerI):void{
    this.banners.push(banner);
  }

  deleteBanner(bannerId:number):void{
    this.banners = this.banners.filter(banner => banner.bannerId !== bannerId);
  }
}
