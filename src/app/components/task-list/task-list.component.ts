import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { Task } from '../../core/task.model';
@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {
  tasks: Task[];
  constructor(private taskService: TaskService) { }

  ngOnInit() {
    this.taskService.updateTasks();
    this.taskService.tasksSubject.subscribe( tasks => {
      this.tasks = tasks;
    });
  }
  deleteTask(i) {
    this.tasks[i].updating = true;
    this.taskService.deleteTask(this.tasks[i]).subscribe(() => {
      this.tasks.splice(i, 1);
    });
  }
}
