import { Component, OnInit, Inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { iphotos } from '../interfaces/iphotos.interface';
import { PhotosService } from '../services/photos.service';

@Component({
  selector: 'app-add-photo-dialog',
  templateUrl: './add-photo-dialog.component.html',
  styleUrls: ['./add-photo-dialog.component.css'],
})
export class AddPhotoDialogComponent implements OnInit {
  title = new FormControl('');
  albumId = new FormControl(0);
  url = new FormControl('');
  thumbnailUrl = new FormControl('');
  editMode: boolean = false;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _ps: PhotosService,
    public dialogRef: MatDialogRef<AddPhotoDialogComponent>
  ) {
    if (data) {
      console.log(data);
      this.title.setValue(data.title);
      this.albumId.setValue(data.albumId);
      this.url.setValue(data.url);
      this.thumbnailUrl.setValue(data.thumbnailUrl);
      this.editMode = true;
    }
  }

  ngOnInit(): void {}

  editPhoto() {
    let photo: any = {
      title: this.title.value,
      albumId: this.albumId.value,
      url: this.url.value,
      thumbnailUrl: this.thumbnailUrl.value,
      collapsed: false,
    };
    this._ps.putphoto(this.data.id, photo).subscribe((result) => {
      this.dialogRef.close(result);
    });
  }

  addPhoto() {
    let photo: any = {
      title: this.title.value,
      albumId: this.albumId.value,
      url: this.url.value,
      thumbnailUrl: this.thumbnailUrl.value,
    };

    this._ps.postphoto(photo).subscribe((result) => {
      this.dialogRef.close(result);
    });
  }
}
