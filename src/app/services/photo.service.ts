import { Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Firestore, doc, docData, setDoc } from '@angular/fire/firestore';
import { Storage, getDownloadURL, ref, uploadString } from '@angular/fire/storage';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  constructor(private storageFireCompat: AngularFireStorage,
    private auth: Auth,
    private firestore: Firestore,
    private storage: Storage) { }

  public async TakeAPhoto(): Promise<Photo> {
    // Take a photo
    const image = await Camera.getPhoto({
      resultType: CameraResultType.Base64,
      source: CameraSource.Camera,
      quality: 90,
      saveToGallery: true,
    });

    return image;
  }

  public async ChooseFromGallery(): Promise<Photo> {
    // Choose From Gallery
    const image = await Camera.getPhoto({
      resultType: CameraResultType.Base64,
      source: CameraSource.Photos,
      quality: 90
    });

    return image;
  }

  public ConvertPhotoBase64ToImage(imageBase64String: any) {
    return 'data:image/jpeg;base64,' + imageBase64String;
  }

  public async uploadImage(cameraFile: Photo) {
    const user = this.auth.currentUser;
    const path = `uploads/${user?.uid}/profile.png`;
    const storageRef = ref(this.storage, path);

    try {
      await uploadString(storageRef, cameraFile.base64String!, 'base64');

      const imageUrl = await getDownloadURL(storageRef);
      const userDocRef = doc(this.firestore, `users/${user?.uid}`);
      await setDoc(userDocRef, { imageUrl, });
      return true;
    } catch (error) {
      return null;
    }
  }

  public async UploadFile(cameraFile: Photo, fileName: any): Promise<string> {
    const path = `uploads/${fileName}.png` //'name-your-file-path-here';
    const storageRef = ref(this.storage, path);

    try {
      await uploadString(storageRef, cameraFile.base64String!, 'base64');

      const imageUrl = await getDownloadURL(storageRef);
      // const userDocRef = doc(this.firestore, `users/${user?.uid}`);
      // await setDoc(userDocRef, { imageUrl, });
      return imageUrl;
    } catch (error) {
      return '';
    }
  }

  public getUserProfile() {
    const user = this.auth.currentUser;
    // const userDocRef = doc(this.firestore, `users/${user?.uid}`);
    const userDocRef = doc(this.firestore, `users/${user?.email}`);
    return docData(userDocRef);
  }
}
