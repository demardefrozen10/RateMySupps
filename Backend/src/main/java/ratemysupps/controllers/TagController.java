package ratemysupps.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ratemysupps.iqueryservice.ITagQueryService;
import ratemysupps.icommandservice.ITagCommandService;
import ratemysupps.readmodel.ReadTag;
import ratemysupps.writemodel.WriteTag;

import java.util.List;

@RestController
@RequestMapping("/api/tag")
public class TagController {

    private final ITagQueryService queryService;
    private final ITagCommandService commandService;

    @Autowired
    public TagController(ITagQueryService queryService, ITagCommandService commandService) {
        this.queryService = queryService;
        this.commandService = commandService;
    }


    @GetMapping("/all")
    public List<ReadTag> getAllTags() {
        return queryService.findAllTags();
    }

    @PostMapping("/create")
    public ResponseEntity<ReadTag> createTag(@RequestBody WriteTag tag) {
        ReadTag created = commandService.submitTag(tag);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }


    @GetMapping("/search")
    public List<ReadTag> searchByName(@RequestParam String keyword) {
        return queryService.findByNameContainingIgnoreCase(keyword);
    }

    @GetMapping("/bySupplement")
    public List<ReadTag> getTagsBySupplement(@RequestParam Long supplementId) {
        return queryService.findBySupplements_Id(supplementId);
    }
}
