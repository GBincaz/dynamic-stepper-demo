import React, {Component, PureComponent} from 'react';
import Stepper from "@material-ui/core/Stepper/Stepper";
import Step from "@material-ui/core/Step/Step";
import StepLabel from "@material-ui/core/StepLabel/StepLabel";
import Button from "@material-ui/core/Button/Button";
import Checkbox from "@material-ui/core/Checkbox/Checkbox";

class DynamicStepper extends Component {

    state = {
        activeStep: 0,
        steps: [],
        stepContents: [],
        step3Hidden: false
    };

    componentDidMount() {
        this.initialiseSteps();
    }

    initialiseSteps = () => {
        let steps = ['Step 1', 'Step 2', 'Step 3', 'Step 4'];
        let stepsContent = [
            <Step1Content/>,
            <Step2Content value={this.state.step3Hidden} handleCheckboxChange={this.handleCheckboxChange}/>,
            <Step3Content/>,
            <Step4Content/>];

        this.setState({
            steps: steps,
            stepContents: stepsContent
        })
    };

    getStepContent = (stepIndex) => {
        const {stepContents} = this.state;
        return stepContents[stepIndex];
    };

    handleNext = () => {
        this.setActiveStep(this.state.activeStep + 1);
    };

    handleBack = () => {
        this.setActiveStep(this.state.activeStep - 1);
    };

    setActiveStep = (newActiveStep) => {
        this.setState({
            activeStep: newActiveStep
        })
    };

    handleCheckboxChange = (event) => {
        const value = event.target.checked;
        value ? this.removeStep(2) : this.addStep(2, 'Create an ad', <Step3Content/>);
        this.setState({
            step3Hidden: value,
        });
    };

    addStep = (index, newStep, content) => {
        const {steps, stepContents} = this.state;
        const newSteps =  [...steps];
        const newStepContents = [...stepContents];

        newSteps.splice(index, 0, newStep);
        newStepContents.splice(index, 0, content);

        this.setState({
            steps: newSteps,
            stepContents: newStepContents
        })
    };

    removeStep = (index) => {
        const {steps, stepContents} = this.state;
        const newSteps = [...steps];
        const newStepContents = [...stepContents];

        newSteps.splice(index, 1);
        newStepContents.splice(index, 1);

        this.setState({
            steps: newSteps,
            stepContents: newStepContents
        })
    };

    render() {
        const {activeStep, steps} = this.state;
        return (
            <div>
                <Stepper activeStep={activeStep}>
                    {steps.map((label) => {
                        return (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        );
                    })}
                </Stepper>
                <div>
                    <div>
                        { this.getStepContent(activeStep) }
                        <div>
                            <Button disabled={activeStep === 0} onClick={this.handleBack}>
                                Back
                            </Button>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={this.handleNext}>
                                {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

function Step1Content() {
    return (
        <h1>Step 1 Content</h1>
    );
}

function Step2Content(props) {
    return (
        <div>
            <h1>Step 2 Content</h1>
            <Checkbox checked={props.value} onChange={props.handleCheckboxChange}/>
        </div>
    );
}

function Step3Content() {
    return (
        <h1>Step 3 Content</h1>
    );
}

function Step4Content() {
    return (
        <h1>Step 4 Content</h1>
    );
}

export default DynamicStepper;