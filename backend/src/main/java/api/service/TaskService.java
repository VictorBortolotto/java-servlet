package api.service;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import api.model.Task;
import api.repository.TaskRepository;
import api.response.TaskResponse;
import api.taskUtils.TaskUtils;
import db.Database;

public class TaskService implements TaskRepository {

	private boolean isPreparedStatementError;
	private boolean isCloseResultSetError;
	private boolean isClosePreparedStatementError;
	private boolean isCloseConnectionError;
	private ResultSet resultSet = null;
	private Task task = null;
	
	public TaskResponse save(Task task) {
		Connection connection = null;
		PreparedStatement preparedStatement = null;
		
		try {
			connection = Database.getConnection();
			preparedStatement = connection.prepareStatement("insert into tasks(name, description, status) values(?, ?, ?)");
			preparedStatement.setString(1, task.getName());
			preparedStatement.setString(2, task.getDescription());
			preparedStatement.setBoolean(3, task.isStatus());
			
			preparedStatement.execute();
			
		} catch (SQLException | ClassNotFoundException e) {
			e.printStackTrace();
			isPreparedStatementError = true;
		}finally {
			isCloseConnectionError = Database.closeConnection(connection);
			isClosePreparedStatementError = Database.closePreparedStatement(preparedStatement);
			
			if(isPreparedStatementError || isCloseConnectionError || isClosePreparedStatementError) {
				return new TaskResponse(500, "Database error");
			}
			
		}
		
		return new TaskResponse(200, "Task created with success!");
	}

	public TaskResponse getById(long id) {
		Connection connection = null;
		PreparedStatement preparedStatement = null;
		
		try {
			connection = Database.getConnection();
			preparedStatement = connection.prepareStatement("select id, name, description, status from tasks where id = ?");
			preparedStatement.setLong(1, id);
			resultSet = preparedStatement.executeQuery();
			
			task =  TaskUtils.getOneTaskFromAResultSet(resultSet);
			
		} catch (SQLException | ClassNotFoundException e) {
			e.printStackTrace();
			isPreparedStatementError = true;
		}finally {
			isCloseConnectionError = Database.closeConnection(connection);
			isClosePreparedStatementError = Database.closePreparedStatement(preparedStatement);
			isCloseResultSetError = Database.closeResultSet(resultSet);
			
			if(isPreparedStatementError || isCloseConnectionError || isClosePreparedStatementError || isCloseResultSetError) {
				return new TaskResponse(500, "Database error");
			}
			
			if (task.getId() == 0) {
				return new TaskResponse(404, "There's no task to retrieve!");
			}
		}
		
		return new TaskResponse(200, "Task retrived with success!", task);
	}

	public TaskResponse findAllTasks() {
		List<Task> taskList = new ArrayList<Task>();
		Connection connection = null;
		PreparedStatement preparedStatement = null;
		
		try {
			connection = Database.getConnection();
			preparedStatement = connection.prepareStatement("select id, name, description, status from tasks");
			resultSet = preparedStatement.executeQuery();
			
			while(resultSet.next()) {
				Task task= new Task();
				task.setId(resultSet.getLong("id"));
				task.setName(resultSet.getString("name"));
				task.setDescription(resultSet.getString("description"));
				task.setStatus(resultSet.getBoolean("status"));
				
				taskList.add(task);
			}
		} catch (SQLException | ClassNotFoundException e) {
			e.printStackTrace();
			isPreparedStatementError = true;
		}finally {
			isCloseConnectionError = Database.closeConnection(connection);
			isClosePreparedStatementError = Database.closePreparedStatement(preparedStatement);
			isCloseResultSetError = Database.closeResultSet(resultSet);
			
			if(isPreparedStatementError || isCloseConnectionError || isClosePreparedStatementError || isCloseResultSetError) {
				return new TaskResponse(500, "Database error");
			}
			
			if (taskList == null || taskList.size() == 0) {
				return new TaskResponse(404, "There's no tasks to retrieve!");
			}
		}
		
		return new TaskResponse(200, "Tasks retrived with success!", taskList);
	}
	
	public TaskResponse findAllTasksByStatus(boolean status) {
		List<Task> taskList = new ArrayList<Task>();
		Connection connection = null;
		PreparedStatement preparedStatement = null;
		
		try {
			connection = Database.getConnection();
			preparedStatement = connection.prepareStatement("select id, name, description, status from tasks where status = ?");
			preparedStatement.setBoolean(1, status);
			resultSet = preparedStatement.executeQuery();
			
			while(resultSet.next()) {
				Task task= new Task();
				task.setId(resultSet.getLong("id"));
				task.setName(resultSet.getString("name"));
				task.setDescription(resultSet.getString("description"));
				task.setStatus(resultSet.getBoolean("status"));
				
				taskList.add(task);
			}
		} catch (SQLException | ClassNotFoundException e) {
			e.printStackTrace();
			isPreparedStatementError = true;
		}finally {
			isCloseConnectionError = Database.closeConnection(connection);
			isClosePreparedStatementError = Database.closePreparedStatement(preparedStatement);
			isCloseResultSetError = Database.closeResultSet(resultSet);
			
			if(isPreparedStatementError || isCloseConnectionError || isClosePreparedStatementError || isCloseResultSetError) {
				return new TaskResponse(500, "Database error");
			}
			
			if (taskList == null || taskList.size() == 0) {
				return new TaskResponse(404, "There's no tasks to retrieve!");
			}
		}
		
		return new TaskResponse(200, "Task retrived with success!", taskList);
	}
	
	public TaskResponse updateTaskName(String name, long id) {
		Connection connection = null;
		PreparedStatement preparedStatement = null;
		long affectedRows = 0;
		
		try {
			connection = Database.getConnection();
			preparedStatement = connection.prepareStatement("update tasks set name = ? where id = ?");
			preparedStatement.setString(1, name);
			preparedStatement.setLong(2, id);
			
			affectedRows = preparedStatement.executeUpdate();
			
		} catch (SQLException | ClassNotFoundException e) {
			e.printStackTrace();
			isPreparedStatementError = true;
		}finally {
			isCloseConnectionError = Database.closeConnection(connection);
			isClosePreparedStatementError = Database.closePreparedStatement(preparedStatement);
			
			if(isPreparedStatementError || isCloseConnectionError || isClosePreparedStatementError) {
				return new TaskResponse(500, "Database error");
			}
			
			if (affectedRows == 0) {
				return new TaskResponse(404, "Oops, something goes wrong, we not found this task!");
			}
 
		}
		
		return new TaskResponse(200, "Task name updated with success!");
	}
	
	public TaskResponse updateTaskDescription(String description, long id) {
		Connection connection = null;
		PreparedStatement preparedStatement = null;
		long affectedRows = 0;
		
		try {
			connection = Database.getConnection();
			preparedStatement = connection.prepareStatement("update tasks set description = ? where id = ?");
			preparedStatement.setString(1, description);
			preparedStatement.setLong(2, id);
		
			affectedRows = preparedStatement.executeUpdate();
			
		} catch (SQLException | ClassNotFoundException e) {
			e.printStackTrace();
			isPreparedStatementError = true;
		}finally {
			isCloseConnectionError = Database.closeConnection(connection);
			isClosePreparedStatementError = Database.closePreparedStatement(preparedStatement);
			
			if(isPreparedStatementError || isCloseConnectionError || isClosePreparedStatementError ) {
				return new TaskResponse(500, "Database error");
			}
			
			if (affectedRows == 0) {
				return new TaskResponse(404, "Oops, something goes wrong, we not found this task!");
			}
 
		}
		
		return new TaskResponse(200, "Task description updated with success!"); 
	}

	
	public TaskResponse updateTaskStatus(long id, Task task) {
		Connection connection = null;
		PreparedStatement preparedStatement = null;
		long affectedRows = 0;
		
		try {
			connection = Database.getConnection();
			preparedStatement = connection.prepareStatement("update tasks set status = ? where id = ?");
			preparedStatement.setBoolean(1, task.isStatus());
			preparedStatement.setLong(2, id);
		
			affectedRows = preparedStatement.executeUpdate();
			
		} catch (SQLException | ClassNotFoundException e) {
			e.printStackTrace();
			isPreparedStatementError = true;
		}finally {
			isCloseConnectionError = Database.closeConnection(connection);
			isClosePreparedStatementError = Database.closePreparedStatement(preparedStatement);
			
			if(isPreparedStatementError || isCloseConnectionError || isClosePreparedStatementError) {
				return new TaskResponse(500, "Database error");
			}
			
			if (affectedRows == 0) {
				return new TaskResponse(404, "Oops, something goes wrong, we not found this task!");
			}
 
		}
		
		return new TaskResponse(200, "Task status updated with success!"); 
	}
	
	public TaskResponse delete(long id) {
		Connection connection = null;
		PreparedStatement preparedStatement = null;
		long affectedRows = 0;
		
		try {
			connection = Database.getConnection();
			preparedStatement = connection.prepareStatement("delete from tasks where id = ?");
			preparedStatement.setLong(1, id);
		
			affectedRows = preparedStatement.executeUpdate();
		} catch (SQLException | ClassNotFoundException e) {
			e.printStackTrace();
			isPreparedStatementError = true;
		}finally {
			isCloseConnectionError = Database.closeConnection(connection);
			isClosePreparedStatementError = Database.closePreparedStatement(preparedStatement);
			
			if(isPreparedStatementError || isCloseConnectionError || isClosePreparedStatementError) {
				return new TaskResponse(500, "Database error");
			}
 
			if (affectedRows == 0) {
				return new TaskResponse(404, "Oops, something goes wrong, we not found this task!");
			}
			
		}
		
		return new TaskResponse(200, "Task deleted updated with success!"); 
	}
}