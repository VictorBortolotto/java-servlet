package utils;

import java.io.File;
import java.io.FileNotFoundException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Scanner;

import org.eclipse.jdt.internal.compiler.batch.Main;

public class DatabaseUtils {

	public static Connection openDatabaseConnection() throws SQLException, ClassNotFoundException {
		loadDriver();
		String[] info = loadDatabaseInfo();
		Connection connection = null;
		
		connection = DriverManager.getConnection(info[0], info[1], info[2]);
		
		
		return connection;
	}
	
	private static void loadDriver() throws ClassNotFoundException {
		String sqlDriver = getDriver();
		Class.forName(sqlDriver);
	};
	
	private static String[] loadDatabaseInfo(){
		ArrayList<String> args = getDatabaseArgs();
		String[] info = new String[args.size()];
		
		String url = "";
		String path = "";
		String data = "";
		
		for(int i = 0; i < args.size(); i++) {
            url = args.get(i);
            path = url.substring(0, url.indexOf("=") + 1);
            data = url.replace(path, "");
            
            info[i] = data;
        }
		
		return info;
	}
	
	private static ArrayList<String> getDatabaseArgs(){
		Scanner values = getApplicationProperties();
		ArrayList<String> args = new ArrayList<String>();
		
		while(values.hasNext()) {
			String data = values.nextLine();
			args.add(data);
		}
		
		return args;
	}
	
	private static Scanner getApplicationProperties() {
		File file = new File("src\\main\\resources\\application.properties");
		Scanner scanner = null;
		
		try {
			scanner = new Scanner(file);
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		}
		
		return scanner;
	}
	
	private static String getDriver() {
		String jarDriverName = getJarNames();
		String driver = "";
		
		if(jarDriverName.contains("mysql")) {
			driver = "com.mysql.cj.jdbc.Driver";
		}else if(jarDriverName.contains("postgresql")) {
			driver = "org.postgresql.Driver";
		}else if (jarDriverName.contains("oracle")) {
			driver = "oracle.jdbc.OracleDriver";
		}else {
			driver = "org.sqlite.JDBC";
		}
		
		return driver;
	}
	
	private static String getJarNames() {
		ArrayList<String> files = getFilesInLib();
		String jarDrive = "";
		
		for(int i = 0; i < files.size(); i++) {
			if(isDatabaseDriver(files.get(i))) {
				jarDrive = files.get(i);
			}
		}
		
		return jarDrive;
	}
	
	private static boolean isDatabaseDriver(String fileName) {
		if(fileName.contains("mysql-connector-java") || 
				fileName.contains("postgresql") || 
				fileName.contains("ojdbc") ||
				fileName.contains("sqlite-jdbc")) {
			return true;
		}
		
		return false;
	}
	
	private static ArrayList<String> getFilesInLib() {
		File folder = new File("src\\main\\webapp\\WEB-INF\\lib\\");
		ArrayList<String> files = new ArrayList<>();
		
		for(File file : folder.listFiles()) {
			String fileName = file.getName();
			files.add(fileName);
		}
		
		return files;
	}
}
