package com.curiousmuch.dto;

import com.curiousmuch.model.VoteType;
import jakarta.validation.constraints.*;

public class VoteRequest {
    @NotNull
    private VoteType voteType;
    
    public VoteRequest() {}
    
    public VoteType getVoteType() { return voteType; }
    public void setVoteType(VoteType voteType) { this.voteType = voteType; }
}