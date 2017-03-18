import { Injectable, Inject } from '@angular/core';
import { AngularFire, FirebaseListObservable, FirebaseApp } from 'angularfire2';
import * as firebase from 'firebase';
import { Md5 } from 'ts-md5/dist/md5';
import 'rxjs/add/operator/map';

import { Guid } from './guid';


@Injectable()
export class Firebase {

  database: any;
  storage: any;

  constructor(
    private af: AngularFire,
    @Inject(FirebaseApp) private firebaseApp: firebase.app.App
  ) {
    this.database = this.af.database;
    this.storage = this.firebaseApp.storage().ref();
  }

  databaseList(path:string): FirebaseListObservable<any[]>
  {
    return this.database.list(path, { preserveSnapshot: true});
  }

  storageUploadImage(path:string, stringFile:string): Promise<any> {

    return new Promise((resolve, reject) => {

      let percentage;

      path = `images/${path}/${Md5.hashStr(stringFile)}_${Guid.newGuid()}.jpeg`;
      const storageref = this.storage.child(path);

      let task = storageref.putString(stringFile, 'base64', {
        contentType:'image/jpeg'
      });

      task.on('state_changed',
        function progress(snapshot){
          percentage = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
          console.log(percentage);
        },function(error) {
          switch (error.code) {
            case 'storage/unauthorized':
              // User doesn't have permission to access the object
              break;

            case 'storage/canceled':
              // User canceled the upload
              break;

            case 'storage/unknown':
              // Unknown error occurred, inspect error.serverResponse
              break;
          }
          reject(error);
        }, () => {
          // Upload completed successfully, now we can get the download URL
          resolve(task.snapshot.downloadURL);
        }
        // this.chk(callback)
      );

    })


  }

}

