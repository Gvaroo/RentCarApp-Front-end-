import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AddCarDTO } from 'src/app/models/car/AddCarDTO';
import { GetBrandsDTO } from 'src/app/models/car/GetBrandsDTO';
import { GetTransmissionsDTO } from 'src/app/models/car/GetTransmissionsDTO';
import { AuthService } from 'src/app/services/auth.service';
import { CarService } from 'src/app/services/car.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-car',
  templateUrl: './add-car.component.html',
  styleUrls: ['./add-car.component.scss'],
})
export class AddCarComponent {
  loading: boolean = false;
  addCarForm: FormGroup = new FormGroup({});
  car: AddCarDTO = {
    name: '',
    year: 0,
    price: 0,
    city: '',
    capacity: 0,
    fuelCapacity: 0,
    createdBy: localStorage.getItem('email') || '',
    brandId: 0,
    modelId: 0,
    transmissionId: 0,
    images: [],
  };

  selectedImages: string[] = [];
  onImageChange(event: any, imageNumber: number) {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        // Convert the image to Base64 string
        const base64String = reader.result as string;
        const base64Data = base64String.split(';base64,')[1];

        this.selectedImages[imageNumber - 1] = base64Data;
      };

      reader.readAsDataURL(file);
    }
  }
  BrandsAndModels: GetBrandsDTO[] = [];
  transmissions: GetTransmissionsDTO[] = [];
  selectedBrand: string = '';

  selectedModel: any;
  selectedBrandModels!: GetBrandsDTO; // selected brand
  BrandSelected: boolean = false;
  selectedTransmission: any;
  onBrandChange(value: string): void {
    for (var item of this.BrandsAndModels) {
      if (item.name == value) {
        this.car.brandId = item.id;
        this.selectedBrandModels = item;
        this.BrandSelected = true;
      }
    }
  }
  onValueChange(): void {
    for (var item of this.BrandsAndModels) {
      for (var model of item.models) {
        if (model.name == this.selectedModel) {
          this.car.modelId = model.id;
          console.log(this.car.modelId);
        }
      }
    }
  }
  onTransmissionChange(value: string): void {
    for (var item of this.transmissions) {
      if (item.name == value) {
        this.car.transmissionId = item.id;
      }
    }
  }
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private carService: CarService
  ) {
    this.getBrandsAndModels();
    this.getTransmissions();
    this.addValidations();
  }

  getBrandsAndModels(): void {
    this.carService.GetBrandsAndModels().subscribe(
      (response) => {
        if (response.success) {
          this.BrandsAndModels = response.data;
          console.log(this.BrandsAndModels);
        } else {
          console.error(response.message);
        }
      },
      (error) => {
        console.error(error);
      }
    );
  }
  getTransmissions(): void {
    this.carService.GetTransmissions().subscribe(
      (response) => {
        if (response.success) {
          this.transmissions = response.data;
          console.log(this.transmissions);
        } else {
          console.error(response.message);
        }
      },
      (error) => {
        console.error(error);
      }
    );
  }
  addCarToDB() {
    this.carService.addCar(this.car).subscribe(
      (response) => {
        if (response.success) {
          this.loading = false;
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Car Added Successfully!',
            showConfirmButton: false,
            timer: 1000,
          }).then((result) => {
            if (result.dismiss === Swal.DismissReason.timer) {
              this.router.navigate(['/']);
            }
          });
        } else {
          console.error(response.message);
        }
      },
      (error) => {
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: error.error.message,
          showConfirmButton: false,
          timer: 1000,
        });
        this.loading = false;
      }
    );
  }
  onSubmit(): void {
    if (this.addCarForm.valid) {
      this.car.images = this.selectedImages;
      this.loading = true;
      this.addCarToDB();
    } else this.markAllFieldsAsTouched();
  }
  addValidations(): void {
    this.addCarForm = this.formBuilder.group({
      name: ['', Validators.required],
      brand: [''],
      model: [''],
      year: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      image1: [''],
      image2: [''],
      image3: [''],
      price: ['', Validators.required],
      capacity: ['', Validators.required],
      transmission: [''],
      fuelCapacity: ['', Validators.required],
      city: ['', Validators.required],
    });
  }
  atLeastOneImageRequiredValidator(
    control: AbstractControl
  ): { [key: string]: boolean } | null {
    const image1 = control.get('image1')?.value;
    const image2 = control.get('image2')?.value;
    const image3 = control.get('image3')?.value;

    if (
      (!image1 || image1 === '') &&
      (!image2 || image2 === '') &&
      (!image3 || image3 === '')
    ) {
      return { atLeastOneImageRequired: true };
    }

    return null;
  }
  markAllFieldsAsTouched() {
    Object.keys(this.addCarForm.controls).forEach((field) => {
      const control = this.addCarForm.get(field);
      if (control) {
        control.markAsTouched();
      }
    });
  }
}
