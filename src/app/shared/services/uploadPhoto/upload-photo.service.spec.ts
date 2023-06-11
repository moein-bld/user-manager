import { TestBed } from '@angular/core/testing';

import { UploadPhotoService } from './upload-photo.service';

describe('UploadPhotoService', () => {
	let service: UploadPhotoService;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(UploadPhotoService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});
});
