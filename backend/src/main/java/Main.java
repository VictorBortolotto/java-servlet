import java.io.File;
import java.io.FileNotFoundException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

import com.mysql.cj.x.protobuf.MysqlxCrud.Find;

public class Main {

	public static void main(String[] args) {
	
		String url = "http://localhost:8080/servlet-api/servlet/api/task";
		
		
		
		System.out.println(returnRouteFromADisplayName(getDisplayNames(getDisplayNamesFromWebXml()), url));
		
		
	}
	
	private static String returnRouteFromADisplayName(ArrayList<String> displayNames, String url) {
		for(int i = 0; i < displayNames.size(); i++) {
			String dispaly = displayNames.get(i);
			if(url.indexOf(dispaly) > 0) {
				url = url.substring(url.indexOf(dispaly), url.length());
			}
		}
		
		return url;
	}
	
	private static ArrayList<String> getDisplayNamesFromWebXml() {
		File absolutePath = new File("src\\main\\webapp\\WEB-INF\\web.xml");
		Scanner scanner;
		ArrayList<String> datas = new ArrayList<String>();
		try {
			scanner = new Scanner(absolutePath);
			while (scanner.hasNext()) {
				String data = scanner.next();
				if(data.contains("display-name")) {
					datas.add(data);
				}
			}
		} catch (FileNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		return datas;
	}
	
	
	private static ArrayList<String> getDisplayNames(List<String> datas) {
		String displayName = "";
		ArrayList<String> displayNames = new ArrayList<String>();
		for(int i = 0; i < datas.size(); i++) {
			displayName = datas.get(i).replace("<display-name>", "");
			displayName = displayName.replace("</display-name>", "");
			displayNames.add(displayName);
		}
		return displayNames;
	}
}
