import { AfterViewInit, Component, inject, OnDestroy } from '@angular/core';
import { BannerService } from '../../Services/banner.service';
import { BannerI } from '../../Interfaces/banner';

@Component({
  selector: 'app-banner',
  imports: [],
  templateUrl: './banner.component.html',
  styleUrl: './banner.component.css',
})
export class BannerComponent implements AfterViewInit, OnDestroy {
  bannerService = inject(BannerService);
  banners: BannerI[] = [];

  // Variables para el carousel.
  carouselContainer: HTMLElement | null = null;
  carouselItem: NodeListOf<Element> | null = null;
  dotContainer: Element | null = null;
  dot: HTMLDivElement | null = null;
  currentIndex: number = 0;
  interval: any;

  constructor() {
    this.banners = this.bannerService.getBanners();
  }

  ngAfterViewInit() {
    this.carouselContainer = document.querySelector('.carouselContainer')
    this.carouselItem = document.querySelectorAll('.carousel');
    this.dotContainer = document.querySelector('.dotContainer');

    this.carouselItem.forEach((_, index) => {
      this.dot = document.createElement('div');
      this.dot.classList.add('dot', 'w-3', 'h-3', 'bg-white', 'rounded-full');
      this.dotContainer?.appendChild(this.dot);

      if (index === 0) {
        this.dot.classList.remove('bg-white')
        this.dot.classList.add('bg-neutral-500');
      }

      this.dot.dataset['carouselIndex'] = index.toString();
      this.dot.addEventListener('click', () => {
        this.goTo(index);
      });
    });

    this.updateCarousel();
    this.startAutoPlay();
  }

  ngOnDestroy(): void {
    this.stopAutoPlay();
  }

  goTo(index: number) {
    this.currentIndex = index;
    this.updateCarousel();
    this.resetInterval();
  }

  startAutoPlay() {
    this.interval = setInterval(() => this.autoAdvance(), 4000);
  }

  stopAutoPlay() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  autoAdvance() {
    if (this.carouselItem) {
      this.currentIndex = (this.currentIndex + 1) % this.carouselItem.length;
      this.updateCarousel();
    }
  }

  updateCarousel() {
    this.carouselContainer!.style.transform = `translateX(${-this.currentIndex * 100}%)`;
    this.updateDotColors();
  }
  updateDotColors() {
    document.querySelectorAll('.dot').forEach((dot, index) => {
      if (index === this.currentIndex) {
        dot.classList.remove('bg-white')
        dot.classList.add('bg-neutral-500');
      } else {
        dot.classList.remove('bg-neutral-500');
        dot.classList.add('bg-white');
      }
    })
  }

  resetInterval() {
    this.stopAutoPlay();
    this.startAutoPlay();
  }
}
