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
      color: 'bg-blue-200',
      imageRightUrl: 'https://raw.githubusercontent.com/Astaroth25/Assets-Inti-Store/refs/heads/main/rightBanner.webp',
      imageLeftUrl: 'https://raw.githubusercontent.com/Astaroth25/Assets-Inti-Store/refs/heads/main/leftBanner.webp',
    },
    {
      bannerId: 1,
      title: 'Banner promocional',
      color: 'bg-rose-200',
      imageRightUrl: 'https://raw.githubusercontent.com/Astaroth25/Assets-Inti-Store/refs/heads/main/rightBanner.webp',
      imageLeftUrl: 'https://raw.githubusercontent.com/Astaroth25/Assets-Inti-Store/refs/heads/main/leftBanner.webp',
    },
    {
      bannerId: 1,
      title: 'Banner promocional',
      color: 'bg-teal-200',
      imageRightUrl: 'https://raw.githubusercontent.com/Astaroth25/Assets-Inti-Store/refs/heads/main/rightBanner.webp',
      imageLeftUrl: 'https://raw.githubusercontent.com/Astaroth25/Assets-Inti-Store/refs/heads/main/leftBanner.webp',
    },
  ];

  //Métodos 
  getBanners(): BannerI[] {
    return this.banners;
  }

  addBanner(banner: BannerI): void {
    this.banners.push(banner);
  }

  deleteBanner(bannerId: number): void {
    this.banners = this.banners.filter(banner => banner.bannerId !== bannerId);
  }
}
