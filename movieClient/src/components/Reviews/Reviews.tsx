import { useEffect, useRef } from "react";
import api from "../../api/axiosConfig";
import { useParams } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import ReviewForm from "../ReviewForm/ReviewForm";
import { ReviewId } from "../../types";

interface ReviewProps {
    getMovieData: (movieId: string | undefined) => Promise<void>; // Update function signature
    movie: any;
    reviews: ReviewId[];
    setReviews: React.Dispatch<React.SetStateAction<ReviewId[]>>;
}

type ReviewFormProps = {
    handleSubmit: (event: React.FormEvent<HTMLButtonElement>) => void;
    revText: React.RefObject<HTMLTextAreaElement> | null; // Update type
    labelText: string;
};

const Reviews = ({
    getMovieData,
    movie,
    reviews,
    setReviews,
}: ReviewProps) => {
    const revText = useRef<HTMLTextAreaElement>(null);
    const params = useParams<{ movieId: string }>();
    const { movieId } = params;

    useEffect(() => {
        getMovieData(movieId);
    }, [getMovieData, movieId]);

    const addReview = async (event: React.FormEvent<HTMLButtonElement>) => {
        event.preventDefault();
        const rev = revText?.current;
        if (!rev) {
            return;
        }
        try {
            const response = await api.post("/reviews", {
                reviewBody: rev.value,
                imdbId: movieId
            });
            const newReview: ReviewId = { id: response.data.id, body: rev.value };
            const updatedReviews = [...reviews, newReview];
            setReviews(updatedReviews);
            rev.value = "";
        }
        catch (err) {
            console.error(err);
        }
    };

    return (
        <Container>
            <Row>
                <Col><h3>Reviews</h3></Col>
            </Row>
            <Row className="mt-2">
                <Col>
                    <img src={movie?.poster} alt="" />
                </Col>
                <Col>
                    {
                        <>
                            <Row>
                                <Col>
                                    <ReviewForm handleSubmit={addReview} revText={revText} labelText="Write a Review?" />
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <hr />
                                </Col>
                            </Row>
                        </>
                    }
                    {
                        reviews?.map((review) => {
                            return (
                                <>
                                    <Row>
                                        <Col>{review.body}</Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <hr />
                                        </Col>
                                    </Row>
                                </>
                            )
                        })
                    }
                </Col>
            </Row>
            <Row>
                <Col>
                    <hr />
                </Col>
            </Row>
        </Container>
    );
};

export default Reviews;