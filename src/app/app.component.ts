import {
  Component,
  OnInit,
  HostListener,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { ViewportScroller } from '@angular/common';

import { PhotosService } from './services/photos.service';
import { iphotos, tPhotos } from './interfaces/iphotos.interface';
import { take, map } from 'rxjs/operators';
import { HelpersPhotosService } from './services/helpers-photos.service';
import { AddPhotoDialogComponent } from './add-photo-dialog/add-photo-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  photos: any[] = [];
  pageYoffset = 0;
  @HostListener('window:scroll', ['$event']) onScroll(event: any) {
    this.pageYoffset = window.pageYOffset;
  }

  constructor(
    private _ps: PhotosService,
    private _hps: HelpersPhotosService,
    private scroll: ViewportScroller,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this._ps
      .getphotos()
      .pipe(take(1))
      .subscribe((data: iphotos[]) => {
        return (this.photos = data.map((photo: iphotos) => ({
          ...photo,
          collapsed: true,
        })));
      });
  }

  editPhoto(photo: any) {
    this.dialog
      .open(AddPhotoDialogComponent, { data: photo })
      .afterClosed()
      .subscribe((result) => {
        if (result) {
          let oldPhoto = this.photos.find((photo) => photo.id === result.id);
          let index = this.photos.indexOf(oldPhoto);
          this.photos[index] = result;
        }
      });
  }

  deletePhoto(id: number) {
    this.photos = this._hps.deletePhoto(id, this.photos);
  }

  openDialog() {
    this.dialog
      .open(AddPhotoDialogComponent)
      .afterClosed()
      .subscribe((result) => {
        this.photos.unshift(result);
      });
  }

  scrollToTop() {
    this.scroll.scrollToPosition([0, 0]);
  }
}
