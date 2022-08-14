import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { Offres } from '../Model/Offres.model';
import { CrudService } from '../service/crud.service';

@Component({
  selector: 'app-ajouteroffre',
  templateUrl: './ajouteroffre.component.html',
  styleUrls: ['./ajouteroffre.component.css']
})
export class AjouteroffreComponent implements OnInit {
  message?: String
  imgURL: any
  imagePath: any
  userFile: any
  addOffreForm: FormGroup
  now = new Date();

  constructor(
    private service: CrudService,
    private router: Router,
    private fb: FormBuilder,
    private toast: NgToastService
  ) {
    let formControls = {


      titre: new FormControl('', [
        Validators.required,

      ]),
      description: new FormControl('', [
        Validators.required,

      ]),
      salaire: new FormControl('', [
        Validators.required,

      ]),
      localisation: new FormControl('', [
        Validators.required,

      ]),
      type: new FormControl('', [
        Validators.required,

      ]),
      site: new FormControl('', [
        Validators.required,

      ]),
      nbrPersonnes: new FormControl('', [
        Validators.required,

      ]),
      genre: new FormControl('', [
        Validators.required,

      ]),
      langue: new FormControl('', [
        Validators.required,

      ]),
      dateExpir: new FormControl('', [
        Validators.required,

      ]),
      datePub: new FormControl('', [
        Validators.required,

      ]),
      niveau: new FormControl('', [
        Validators.required,

      ]),
      logo: new FormControl('', [
        Validators.required,

      ]),



    }
    this.addOffreForm = this.fb.group(formControls)
  }
  get titre() { return this.addOffreForm.get('titre') }
  get description() { return this.addOffreForm.get('description') }
  get salaire() { return this.addOffreForm.get('salaire') }
  get type() { return this.addOffreForm.get('type') }
  get localisation() { return this.addOffreForm.get('localisation') }
  get site() { return this.addOffreForm.get('site') }
  get nbrPersonnes() { return this.addOffreForm.get('nbrPersonnes') }
  get genre() { return this.addOffreForm.get('genre') }
  get langue() { return this.addOffreForm.get('langue') }
  get dateExpir() { return this.addOffreForm.get('dateExpir') }
  get datePub() { return this.addOffreForm.get('datePub') }
  get niveau() { return this.addOffreForm.get('niveau') }
  get logo() { return this.addOffreForm.get('logo') }
  onSelectFile(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.userFile = file;


      var mimeType = event.target.files[0].type;
      if (mimeType.match(/image\/*/) == null) {
        this.message = 'Only images are supported.';
        return;
      }

      var reader = new FileReader();

      this.imagePath = file;
      reader.readAsDataURL(file);
      reader.onload = (_event) => {
        this.imgURL = reader.result;
      };
    }
  }
  addOffre() {
    let data = this.addOffreForm.value;
    console.log(data);


    let offre = new Offres(
      undefined, data.titre, data.site, data.salaire, data.localisation,
      data.type, undefined, data.description, data.nbrPersonnes,
      data.genre, data.langue, data.dateExpir, this.now.toLocaleDateString(), data.niveau, this.imgURL);
    console.log(offre);

    if (data.titre == 0 || data.description == 0 || data.salaire == 0 || data.localisation == 0 || data.type == 0
      || data.nbrPersonnes == 0 || data.genre == 0 || data.langue == 0 || data.dateExpir == 0 || data.niveau == 0) {
      this.toast.info({
        detail: "Erreur msg !!",
        summary: "les champs sont obligatoires"

      }
      );
    }
    else {

      this.service.addOffre(offre).subscribe(

        res => {
          console.log(res);

          this.router.navigate(['/offre']);
          this.toast.info({
            summary: "Votre demande est en cours de traitement"
          })
        },
        err => {
          console.log(err);
          this.toast.error({
            detail: "Error msg",
            summary: "verifier votre formulaire"
          });

        }

      )
    }
  }




  ngOnInit(): void {
    // this.service.loginRequired()
  }

}