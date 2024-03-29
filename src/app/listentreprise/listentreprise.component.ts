import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Entreprise } from '../Model/Entreprise.model';
import { CrudService } from '../service/crud.service';

@Component({
  selector: 'app-listentreprise',
  templateUrl: './listentreprise.component.html',
  styleUrls: ['./listentreprise.component.css']
})
export class ListentrepriseComponent implements OnInit {
  listEntreprises: Entreprise[] = []
  id: number = 0;
  user: any
  constructor(
    private router: Router,
    private service: CrudService,
  ) { }

  ngOnInit(): void {
    this.user = localStorage.getItem("User")
    if (this.user) {
      this.id = this.service.userDetail().id;

    }
    this.service.getEntreprises().subscribe(data => {
      this.listEntreprises = data
      this.listEntreprises = this.listEntreprises.filter(entre => entre.etat == 1).filter(ent => ent.logo != null)

      console.log(this.listEntreprises)
    })
  }

}
