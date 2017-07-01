export class MultipleChoiceQuestion {
    Answers: string[];
    CorretAnswerIndex: number;
    ImageUrl: string;

    constructor(_answers: string[],
        _correctAnswerIndex: number,
        _imageUrl: string) {
        this.Answers = _answers;
        this.CorretAnswerIndex = _correctAnswerIndex;
        this.ImageUrl = _imageUrl;
    }
}