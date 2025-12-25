package ratemysupps;
import java.util.List;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import ratemysupps.entity.Tag;
import ratemysupps.repository.ITagRepository;

@SpringBootTest
public class TagRepositoryTest {

    @Autowired
    private ITagRepository tagRepo;

    @Test
    void testTagRepoMethods() {
        List<Tag> allTags = tagRepo.findAll();
        allTags.forEach(tag -> System.out.println("Tag: id=" + tag.getId() + ", name=" + tag.getName()));
    
        List<Tag> searchTags = tagRepo.findByNameContainingIgnoreCase("ski");
        searchTags.forEach(tag -> System.out.println("Search tag: id=" + tag.getId() + ", name=" + tag.getName()));

        List<Tag> supplementTags = tagRepo.findBySupplements_Id(1L);
        supplementTags.forEach(tag -> System.out.println("Supplement tag: id=" + tag.getId() + ", name=" + tag.getName()));
        }
}
