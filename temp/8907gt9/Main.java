import java.util.*;

public class Main {
    public static void main(String args[]) {
        String s1 = "Hello";
        String s2 = new String("Hello");

        // 1. equals()
        System.out.println("It checks the actual content of s1 and s2 \"equals()\" " + s1.equals(s2));

        // 2. == operator
        System.out.println("It checks the objects regardless of the content \" == \" " + (s1 == s2));

        // 3. compareTo()
        System.out.println("It checks the strings lexicographycally \" compareTo() \" " + s1.compareTo(s2));
    }
}
