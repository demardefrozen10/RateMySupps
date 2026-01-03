package ratemysupps.writemodel;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class UpdateSupplement {

    private List<String> variants;

    private List<String> servingSizes;

    private List<Long> tagIds;
}
