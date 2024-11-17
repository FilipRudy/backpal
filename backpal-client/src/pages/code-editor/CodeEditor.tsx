import React, { useEffect, useRef, useState } from "react";
import { EditorView, basicSetup } from "codemirror";
import { javascript } from "@codemirror/lang-javascript";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, Button } from "react-bootstrap";
import "../code-editor/code-editor.css";
import "../code-editor/code-mirror-styles.css";
import { useRunUserCodeTests } from "../../hooks/useRunUserCodeTests";
import { useParams, useNavigate } from "react-router-dom";
import useFetchStepDetails from "../../hooks/useFetchStepDetails";

interface TestResult {
    fullName: string;
    status: 'passed' | 'failed';
}

interface TestFileResult {
    failureMessage: string;
    testResults: TestResult[];
}

interface Result {
    success: boolean;
    numPassedTests: number;
    numFailedTests: number;
    testResults: TestFileResult[];
}

export const CodeEditor = () => {
    const editorRef = useRef<HTMLDivElement>(null);
    const editorViewRef = useRef<EditorView | null>(null);
    const [testResults, setTestResults] = useState<{ title: string; status: string }[]>([]);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const { stepId } = useParams<{ stepId: string }>();
    const { step, loading, error: stepError } = useFetchStepDetails(Number(stepId));
    const navigate = useNavigate();

    const { runUserCode, isLoading, result, error } = useRunUserCodeTests(step?.lambdaUrl, stepId);

    useEffect(() => {
        if (editorRef.current && !editorViewRef.current) {
            editorViewRef.current = new EditorView({
                doc: step?.initialCode.replace(/\\n/g, '\n'),
                extensions: [basicSetup, javascript()],
                parent: editorRef.current,
            });
        }
        return () => {
            if (editorViewRef.current) {
                editorViewRef.current.destroy();
                editorViewRef.current = null;
            }
        };
    }, [step]);

    useEffect(() => {
        if (result) {
            if (typeof result === "object" && "testResults" in result) {
                const results = (result as Result).testResults.flatMap(testFile => {
                    if (testFile.testResults.length > 0) {
                        return testFile.testResults.map(test => ({
                            title: test.fullName,
                            status: test.status === 'passed' ? 'Passed' : 'Failed'
                        }));
                    } else {
                        return [{
                            title: testFile.failureMessage || "Test execution failed",
                            status: ""
                        }];
                    }
                });

                setTestResults(results.length > 0 ? results : [{ title: "Test execution failed", status: "Failed" }]);

                const allPassed = results.every(test => test.status === 'Passed');
                if (allPassed) {
                    setShowSuccessModal(true);
                }
            } else {
                setTestResults([{ title: "Test execution failed", status: "Failed" }]);
            }
        }
    }, [result]);

    const runCode = () => {
        if (editorViewRef.current) {
            const userCode = editorViewRef.current.state.doc.toString();
            runUserCode(userCode);
        }
    };

    const goBack = () => {
        navigate(-1);
    };

    const handleCloseModal = () => {
        setShowSuccessModal(false);
    };

    return (
        <div className="editor-wrapper d-flex vh-100 p-3">
            <div className="d-flex flex-column p-3 text-section">
                <div className="section-box mb-3">
                    <h4>Your goals for this task</h4>
                    <p>{step?.taskContent}</p>
                </div>
                <div className="section-box">
                    <h4>Theoretical introduction</h4>
                    <p>{step?.theoreticalIntro}</p>
                </div>
            </div>
            <div className="d-flex flex-column flex-grow-1">
                <div
                    className="code-editor-container mb-3"
                    ref={editorRef}
                    style={{ height: "75vh" }}
                />

                <div className="d-flex mb-3">
                    <button className="btn btn-secondary flex-fill me-2" onClick={goBack}>
                        Go Back
                    </button>
                    <button className="btn btn-primary flex-fill me-2" onClick={runCode} disabled={isLoading}>
                        {isLoading ? "Running..." : "Run Code"}
                    </button>
                    <button className="btn btn-secondary flex-fill"
                            onClick={() => window.open(step?.repositoryLink, "_blank")}>
                        Current codebase
                    </button>
                </div>

                <div className="output-container p-3">
                    <h5>Code Output:</h5>
                    {error ? (
                        <p className="text-danger">{error}</p>
                    ) : (
                        <div>
                            {testResults.length > 0 ? (
                                testResults.length === 1 ? (
                                    <p>{testResults[0].title}</p>
                                ) : (
                                    <ul>
                                        {testResults.map((test, index) => (
                                            <li key={index}>
                                                {test.title}: <strong>{test.status}</strong>
                                            </li>
                                        ))}
                                    </ul>
                                )
                            ) : (
                                <p>No results available</p>
                            )}
                        </div>
                    )}
                </div>
            </div>
            <Modal show={showSuccessModal} onHide={handleCloseModal} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Congratulations!</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>All tests passed successfully. Great job!</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={goBack}>
                        Go Back
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};
