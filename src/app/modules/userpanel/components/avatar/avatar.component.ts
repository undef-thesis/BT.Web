import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { UserProfileService } from 'src/app/core/services/user-profile.service';

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss'],
})
export class AvatarComponent implements OnInit {
  @Input() avatar: string;
  @ViewChild('avatarFile') avatarFile: ElementRef;

  public isLoading: boolean = false;
  public apiError: string;

  public selectedAvatar = null;

  constructor(
    private userProfileService: UserProfileService,
    private toastr: ToastrService,
    private translate: TranslateService
  ) {}

  ngOnInit(): void {}

  public onSubmit(avatar): void {
    this.isLoading = true;

    this.userProfileService
      .updateAvatar(avatar.files[0])
      .subscribe(
        () => {
          this.toastr.success(
            this.translate.instant('notification.change-avatar')
          );
        },
        (error) => {
          this.toastr.success(
            this.translate.instant('notification.change-avatar-error')
          );
          this.apiError = error.error;
        }
      )
      .add(() => {
        this.isLoading = false;
      });
  }

  public openFileDialog(): void {
    let event = new MouseEvent('click', { bubbles: false });
    this.avatarFile.nativeElement.dispatchEvent(event);
  }

  public onFileChange(event) {
    const reader = new FileReader();

    reader.onload = (event: ProgressEvent) => {
      this.selectedAvatar = (<FileReader>event.target).result;
    };

    reader.readAsDataURL(event.target.files[0]);
  }

  public get getUserSignature(): string {
    return (
      JSON.parse(localStorage.getItem('me')).firstname[0] +
      JSON.parse(localStorage.getItem('me')).lastname[0]
    );
  }
}
