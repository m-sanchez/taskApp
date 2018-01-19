import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TaskService } from '../../services/task.service';
import { Task } from '../../core/task.model';
@Component({
  selector: 'app-task-creator',
  templateUrl: './task-creator.component.html',
  styleUrls: ['./task-creator.component.scss']
})
export class TaskCreatorComponent implements OnInit {

  taskGroup: FormGroup;
  constructor(private taskService: TaskService) { }

  ngOnInit() {
    this.taskGroup = new FormGroup ({
      title: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
    });
  }
  onSubmit({ value, valid }: { value: any, valid: boolean }) {
    if (valid) {
      const newTask = new Task(value.title, value.description);
      this.taskService.addTask(newTask);
      this.taskGroup.reset();
    }
  }
}
