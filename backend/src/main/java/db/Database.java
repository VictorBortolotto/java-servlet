package db;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import api.model.Task;
import api.response.TaskResponse;
import utils.DatabaseUtils;

public class Database {

	public static PreparedStatement createPreparedStatement(String sql) {
		PreparedStatement preparedStatement = null;
		Connection connection = getConnection();
		
		try {
			preparedStatement = connection.prepareStatement(sql);
		} catch (SQLException e) {
			e.printStackTrace();
		}
		
		return preparedStatement;
	}
	
	public static ResultSet executePreparedStatementQuery(PreparedStatement preparedStatement) {
		ResultSet resultSet = null;
		try {
			resultSet = preparedStatement.executeQuery();
		} catch (SQLException e) {
			e.printStackTrace();
		}
		
		return resultSet;
	}
	
	public static TaskResponse executePreparedStatement(PreparedStatement preparedStatement, String onSuccessMessage, String onFailureMessage, Task task) {
		try {
			preparedStatement.execute();
		} catch (SQLException e) {
			e.printStackTrace();
			return new TaskResponse(500, onFailureMessage, null, null);
		}finally {
			closePreparedStatement(preparedStatement);
		}
		
		return new TaskResponse(200, onSuccessMessage, task, null);
	}
	
	private static Connection getConnection() {
		Connection connection = DatabaseUtils.openDatabaseConnection();
		
		return connection;
	}
	
	private static void closePreparedStatement(PreparedStatement preparedStatement) {
		try {
			if(!preparedStatement.isClosed()) {
				preparedStatement.close();
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}
	}
	
	public static void closeConnection(Connection connection) {
		try {
			if(!connection.isClosed()) {	
				connection.close();
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}
	}
	
}
