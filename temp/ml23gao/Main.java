import java.util.StringJoiner;
import java.util.StringTokenizer;

public class String_join {
    public static void main(String args[]) {

        String s = "Hello welcome to the City of Joy";
        StringTokenizer s1 = new StringTokenizer(s, " ");

        StringJoiner s3 = new StringJoiner(",");

        while (s1.hasMoreTokens()) {
            s3.add(s1.nextToken());
        }

        System.out.println(s3);

    }
}
