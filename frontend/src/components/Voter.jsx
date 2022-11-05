import React from "react";

function Voter() {

    useEffect(() => {
        votes.map((vote) => {
            summonVotes += parseInt(vote.vote);
        });
        const roundVotes = summonVotes / votes.length || 0;
        // console.log(roundVotes);
        if (roundVotes > 4.5) {
            setStar1(starFull);
            setStar2(starFull);
            setStar3(starFull);
            setStar4(starFull);
            setStar5(starFull);
        } else if (roundVotes > 4) {
            setStar1(starFull);
            setStar2(starFull);
            setStar3(starFull);
            setStar4(starFull);
            setStar5(starHalf);
        } else if (roundVotes > 3.5) {
            setStar1(starFull);
            setStar2(starFull);
            setStar3(starFull);
            setStar4(starFull);
            setStar5(starEmpty);
        } else if (roundVotes > 3) {
            setStar1(starFull);
            setStar2(starFull);
            setStar3(starFull);
            setStar4(starHalf);
            setStar5(starEmpty);
        } else if (roundVotes > 2.5) {
            setStar1(starFull);
            setStar2(starFull);
            setStar3(starFull);
            setStar4(starEmpty);
            setStar5(starEmpty);
        } else if (roundVotes > 2) {
            setStar1(starFull);
            setStar2(starFull);
            setStar3(starHalf);
            setStar4(starEmpty);
            setStar5(starEmpty);
        } else if (roundVotes > 1.5) {
            setStar1(starFull);
            setStar2(starFull);
            setStar3(starEmpty);
            setStar4(starEmpty);
            setStar5(starEmpty);
        } else if (roundVotes > 1) {
            setStar1(starFull);
            setStar2(starHalf);
            setStar3(starEmpty);
            setStar4(starEmpty);
            setStar5(starEmpty);
        } else if (roundVotes > 0.5) {
            setStar1(starFull);
            setStar2(starEmpty);
            setStar3(starEmpty);
            setStar4(starEmpty);
            setStar5(starEmpty);
        } else if (roundVotes > 0) {
            setStar1(starHalf);
            setStar2(starEmpty);
            setStar3(starEmpty);
            setStar4(starEmpty);
            setStar5(starEmpty);
        } else {
            setStar1(starEmpty);
            setStar2(starEmpty);
            setStar3(starEmpty);
            setStar4(starEmpty);
            setStar5(starEmpty);
        }
    }, [votes]);

    return (
        <div className="vote">
            <img
                onClick={() => {
                    postVotes(details.id, 1);
                }}
                className="star"
                src={star1}
                width="20"
            />
            <img
                onClick={() => {
                    postVotes(details.id, 2);
                }}
                className="star"
                src={star2}
                width="20"
            />
            <img
                onClick={() => {
                    postVotes(details.id, 3);
                }}
                className="star"
                src={star3}
                width="20"
            />
            <img
                onClick={() => {
                    postVotes(details.id, 4);
                }}
                className="star"
                src={star4}
                width="20"
            />
            <img
                onClick={() => {
                    postVotes(details.id, 5);
                }}
                className="star"
                src={star5}
                width="20"
            />
        </div>
    );
}

export default Voter;
