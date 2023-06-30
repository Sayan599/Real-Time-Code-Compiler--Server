import java.util.ArrayList;
import java.util.Collections;

public class Main {
    public static void main(String args[]) {
        ArrayList<Integer> list = new ArrayList<>();
        list.add(4);
        list.add(5);
        list.add(60);
        System.out.println("List" + list);

        // Collections.reverse(list);
        Collections.swap(list, 0, 1);
        System.out.println("list" + list);
    }
}
