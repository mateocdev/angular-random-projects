import { Component } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ActivatedRoute, Router } from "@angular/router";
import { switchMap } from "rxjs";
import { ConfirmDialogComponent } from "../../components/confirm-dialog/confirm-dialog.component";
import { Hero, Publisher } from "../../interfaces/hero.interface";
import { HeroesService } from "../../services/heroes.service";

@Component({
  selector: "app-new-page",
  templateUrl: "./new-page.component.html",
  styles: [],
})
export class NewPageComponent {
  public heroForm = new FormGroup({
    id: new FormControl(""),
    superhero: new FormControl("", { nonNullable: true }),
    publisher: new FormControl<Publisher>(Publisher.DCComics),
    alter_ego: new FormControl(""),
    first_appearance: new FormControl(""),
    characters: new FormControl(""),
    alt_img: new FormControl(""),
  });

  public publishers = [
    { id: "DC Comics", desc: "DC - Comics" },
    { id: "Marvel Comics", desc: "Marvel - Comics" },
  ];
  constructor(
    private heroesService: HeroesService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private snackbar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  get currentHero(): Hero {
    return this.heroForm.value as Hero;
  }

  onDeleteHero() {
    if (!this.currentHero.id) return;
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: { ...this.currentHero },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (!result) return;
      this.heroesService.deleteHero(this.currentHero.id!).subscribe((resp) => {
        this.router.navigateByUrl("/heroes");
      });
    });
  }

  ngOnInit(): void {
    if (!this.router.url.includes("edit")) return;
    this.activatedRoute.params
      .pipe(switchMap(({ id }) => this.heroesService.getHeroById(id)))
      .subscribe((hero) => {
        if (!hero) return this.router.navigateByUrl("/");
        this.heroForm.reset(hero);
        return;
      });
  }

  onSubmit(): void {
    if (this.heroForm.invalid) return;

    if (this.currentHero.id) {
      this.heroesService.updateHero(this.currentHero).subscribe((hero) => {
        this.showSnackbar(`${hero.superhero} updated`);
      });
      return;
    }

    this.heroesService.addHero(this.currentHero).subscribe((hero) => {
      this.showSnackbar("Hero created");
      this.router.navigateByUrl(`/heroes/edit/${hero.id}`);
    });
  }

  showSnackbar(message: string): void {
    this.snackbar.open(message, "ok", {
      duration: 2500,
    });
  }
}
