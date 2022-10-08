package db;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import api.model.Task;
import api.response.TaskResponse;
import utils.DatabaseUtils;

public class Database {

	public static Connection getConnection() throws ClassNotFoundException, SQLException {
		Connection connection = DatabaseUtils.openDatabaseConnection();
		
		return connection;
	}
	
	public static boolean closePreparedStatement(PreparedStatement preparedStatement) {
		try {
			if(!preparedStatement.isClosed()) {
				preparedStatement.close();
			}
		} catch (SQLException e) {
			e.printStackTrace();
			return true;
		}
		
		return false;
	}
	
	public static boolean closeResultSet(ResultSet resultSet) {
		try {
			if(!resultSet.isClosed()) {
				resultSet.close();
			}
		} catch (SQLException e) {
			e.printStackTrace();
			return true;
		}
		
		return false;
	}
	
	public static boolean closeConnection(Connection connection) {	
		try {
			if(!connection.isClosed()) {	
				connection.close();
			}
		} catch (SQLException e) {
			e.printStackTrace();
			return true;
		}
		
		return false;
	}
	
}
