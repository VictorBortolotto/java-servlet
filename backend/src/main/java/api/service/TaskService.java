package api.service;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

import api.model.Task;
import api.response.TaskResponse;
import api.taskUtils.TaskUtils;
import db.Database;

public class TaskService{

	public TaskService() {
	}
	
	public TaskResponse save(Task task) {
		PreparedStatement preparedStatement = Database.createPreparedStatement("insert into tasks(name, description, status) values(?, ?, ?)");
		
		TaskResponse serverResponse = null;
		try {
			preparedStatement.setString(1, task.getName());
			preparedStatement.setString(2, task.getDescription());
			preparedStatement.setBoolean(3, task.isStatus());
			serverResponse = Database.executePreparedStatement(preparedStatement, "Task created with success!","Server error, cannot create the task!", task);
		} catch (SQLException e) {
			return serverResponse;
		}
		
		return serverResponse;
	}

	public TaskResponse getById(long id) {
		PreparedStatement preparedStatement = Database.createPreparedStatement("select id, name, description, status from tasks where id = ?");
		ResultSet resultSet = null;
		TaskResponse taskResponse = null;
		try {
			preparedStatement.setLong(1, id);
			resultSet = Database.executePreparedStatementQuery(preparedStatement);
			taskResponse = TaskUtils.getOneTaskFromAResultSet(resultSet);
		} catch (SQLException e) {
			return taskResponse;
		}
		
		return taskResponse;
	}

	public TaskResponse findAllTasksByStatus(boolean status) {
		PreparedStatement preparedStatement = Database.createPreparedStatement("select id, name, description, status from tasks where status = ?");
		ResultSet resultSet = null;
		TaskResponse taskResponse = null;
		
		try {
			preparedStatement.setBoolean(1, status);
			resultSet = Database.executePreparedStatementQuery(preparedStatement);
			taskResponse = TaskUtils.getTasksFromAResultSet(resultSet);
		} catch (Exception e) {
			return taskResponse;
		}
		
		return taskResponse;
	}
	
	public TaskResponse updateTaskName(String name, long id) {
		PreparedStatement preparedStatement = Database.createPreparedStatement("update tasks set name = ? where id = ?");
		TaskResponse taskResponse = null;
		
		try {
			preparedStatement.setString(1, name);
			preparedStatement.setLong(2, id);
			taskResponse = Database.executePreparedStatement(preparedStatement, "Task updated with success!", "Server error, something goes wrong, cannot update the task status!", null);
		} catch (Exception e) {
			return taskResponse; 
		}
		
		return taskResponse;
	}
	
	public TaskResponse updateTaskDescription(String description, long id) {
		PreparedStatement preparedStatement = Database.createPreparedStatement("update tasks set description = ? where id = ?");
		TaskResponse taskResponse = null;
		
		try {
			preparedStatement.setString(1, description);
			preparedStatement.setLong(2, id);
			taskResponse = Database.executePreparedStatement(preparedStatement, "Task updated with success!", "Server error, something goes wrong, cannot update the task status!", null);
		} catch (Exception e) {
			return taskResponse; 
		}
		
		return taskResponse;
	}

	public TaskResponse updateTaskToPendding(long id) {
		PreparedStatement preparedStatement = Database.createPreparedStatement("update tasks set status = false where id = ?");
		TaskResponse taskResponse = null;
		
		try {
			preparedStatement.setLong(1, id);
			taskResponse = Database.executePreparedStatement(preparedStatement, "Task updated with success!", "Server error, something goes wrong, cannot update the task status!", null);
		} catch (Exception e) {
			return taskResponse; 
		}
		
		return taskResponse;
	}
	
	public TaskResponse updateTaskToDone(long id) {
		PreparedStatement preparedStatement = Database.createPreparedStatement("update tasks set status = true where id = ?");
		TaskResponse taskResponse = null;
		
		try {
			preparedStatement.setLong(1, id);
			taskResponse = Database.executePreparedStatement(preparedStatement, "Task updated with success!", "Server error, something goes wrong, cannot update the task status!", null);
		} catch (Exception e) {
			return taskResponse; 
		}
		
		return taskResponse;
	}
	
	public TaskResponse delete(long id) {
		PreparedStatement preparedStatement = Database.createPreparedStatement("delete from tasks where id = ?");
		TaskResponse taskResponse = null;
		
		try {
			preparedStatement.setLong(1, id);
			taskResponse = Database.executePreparedStatement(preparedStatement, "Task deleted with success!", "Server error, something goes wrong, cannot update the task status!", null);
		} catch (Exception e) {
			return taskResponse; 
		}
		
		return taskResponse;
	}
}