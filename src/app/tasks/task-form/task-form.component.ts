import { Component, Input, OnInit } from '@angular/core';
import { Task } from '../models';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpService } from 'src/app/core/http.service';
import { TasksService } from 'src/app/core/services/tasks.service';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/core/services/alert.service';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss'],
})
export class TaskFormComponent implements OnInit {
  //for editing tasks
  @Input() task?: Task;
  taskForm: FormGroup;

  ngOnInit(): void {
    console.log(this.task);
    this.taskForm = new FormGroup({
      title: new FormControl(this.task?.title, [Validators.required]),
      description: new FormControl(this.task?.description, [
        Validators.required,
      ]),
      completed: new FormControl(false, []),
    });
  }

  constructor(
    private taskService: TasksService,
    private router: Router,
    private alertService: AlertService
  ) {}

  onSubmit() {
    if (this.task) {
      this.taskService.updateTask({ ...this.taskForm.value, id: this.task.id });

      this.alertService.setOpen('Task succesfully edited!');
    } else {
      this.taskService.createTask(this.taskForm.value);
      this.alertService.setOpen('Task succesfully created!');
    }
    this.taskForm.reset();
    this.router.navigate(['/']);
  }
}
