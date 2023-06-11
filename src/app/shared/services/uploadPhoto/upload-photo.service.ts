import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Observable, finalize, from, of, switchMap, take } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class UploadPhotoService {
	constructor(private storage: AngularFireStorage) {}

	// uploadImage(image: File, path: string): Observable<string> {
	// 	const storageRef = ref(this.storage, path);
	// 	const uploadTask = from(uploadBytes(storageRef, image));
	// 	return uploadTask.pipe(switchMap((result) => getDownloadURL(result.ref)));
	// }

	uploadImage(file: File, path: string) {
		const ref = this.storage.ref(path);
		const task = ref.put(file);
		return from(task).pipe(
			switchMap(() => ref.getDownloadURL()),
			finalize(() => {}),
		);
	}
}
