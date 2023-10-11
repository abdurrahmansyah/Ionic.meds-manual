import { Component, OnInit } from '@angular/core';
import { Directory, Filesystem } from '@capacitor/filesystem';

@Component({
  selector: 'app-obat',
  templateUrl: './obat.page.html',
  styleUrls: ['./obat.page.scss'],
})
export class ObatPage implements OnInit {

  recording = false;
  storedFileNames: any[] = [];

  constructor() { }

  ngOnInit() {
    this.loadFiles();
  }

  async loadFiles() {
    Filesystem.readdir({
      path: '',
      directory: Directory.Data
    }).then(result => {
      console.log(result);
      this.storedFileNames = result.files;
    })
  }

  startRecording() {
    if (this.recording)
      return;

    this.recording = true;

  }
  stopRecording() { }
}
