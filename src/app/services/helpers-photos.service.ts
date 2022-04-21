import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { iphotos, tPhotos } from 'src/app/interfaces/iphotos.interface';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { AddPhotoDialogComponent } from '../add-photo-dialog/add-photo-dialog.component';
import { PhotosService } from './photos.service';

@Injectable({
  providedIn: 'root',
})
export class HelpersPhotosService {
  constructor(private _ps: PhotosService, private dialog: MatDialog) {}

  deletePhoto(id: number, photos: tPhotos[]) {
    this.dialog
      .open(ConfirmDialogComponent)
      .afterClosed()
      .subscribe((confirm) => {
        if (confirm) {
          this._ps.deletephotoById(id).subscribe();
        }
      });
    return photos.filter((photo) => photo.id !== id);
  }
}
