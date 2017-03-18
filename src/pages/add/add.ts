import { Component, ViewChild } from '@angular/core';
import { NavController, ViewController, NavParams } from 'ionic-angular';
import { Validators, FormBuilder, FormArray, FormGroup } from '@angular/forms';
import { Firebase } from '../../providers/firebase';

import { Camera } from 'ionic-native';

@Component({
  selector: 'page-add',
  templateUrl: 'add.html'
})
export class AddPage {
  @ViewChild('fileInput') fileInput;

  currentYear: number = new Date().getFullYear();
  isReadyToSave: boolean;
  form: FormGroup;

  constructor(
    public viewCtrl: ViewController,
    public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public firebase: Firebase
  ) {

    this.form = formBuilder.group({

        key: [''],
        lat: [''],
        lng: [''],

        pic: [''],

        title: [''],
        description: ['']

    });

    // Watch the form for changes, and
    this.form.valueChanges.subscribe((v) => {
      this.isReadyToSave = this.form.valid;
    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddPage');
  }

  cancel() {
    this.viewCtrl.dismiss();
  }

  done() {
    if(!this.form.valid) { return; }
    this.viewCtrl.dismiss(this.form.value);
  }

  processWebImage(event) {
    let input = this.fileInput.nativeElement;

    var reader = new FileReader();
    reader.onload = (readerEvent) => {
      input.parentNode.removeChild(input);

      var imageData = (readerEvent.target as any).result;

      this.uploadImage(imageData.split('base64,')[1]);
    };

    reader.readAsDataURL(event.target.files[0]);
  }

  getPicture() {
    if (Camera['installed']()) {
      Camera.getPicture({
        quality: 65,
        destinationType: Camera.DestinationType.DATA_URL,
        encodingType: Camera.EncodingType.JPEG,
        allowEdit: true,
        correctOrientation: true,
        targetWidth: 512,
        targetHeight: 512,
        saveToPhotoAlbum: false,
        cameraDirection: Camera.Direction.BACK
      }).then((data) => {
        this.uploadImage(data); // data:image/jpeg;base64,' + data
      }, (err) => {
        // cancel or unable to take photo
      })
    } else {
      this.fileInput.nativeElement.click();
    }
  }

  getProfileImageStyle() {
    return 'url(' + this.form.controls['pic'].value + ')'
  }

  private uploadImage(stringFile:string)
  {
    this.firebase.storageUploadImage('items', stringFile)
      .then(url => {
        this.form.controls['pic'].patchValue(url, {onlySelf: true});
      })
  }

}
