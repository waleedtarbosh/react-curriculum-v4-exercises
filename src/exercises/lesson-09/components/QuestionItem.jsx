import { useContext, useState } from 'react';
import { SurveyContext } from '../SurveyContext';
import { QUESTION_TYPES } from '../surveyReducer';
import styles from '../StudentWork.module.css';

// Question Item Component - Students will add Edit/Delete functionality here
export function QuestionItem({ question }) {
  // HINT: use these with controlled form
  const [workingText, setWorkingText] = useState(question.question);
  const [workingOptions, setWorkingOptions] = useState(question.options || []);
  const { state, dispatch } = useContext(SurveyContext);

  const isEditing = state.ui.editingQuestionId === question.id;

  // Helper function to convert type to title case
  const formatQuestionType = (type) => {
    return type
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join('-');
  };

  // TODO: Students will add edit functionality here
  const handleEdit = () => {
    // Hint: Use SET_EDITING_QUESTION action
    if (isEditing) {
      dispatch({ type: 'SET_EDITING_QUESTION', payload: { questionId: null } });
      // Reset local values if the user cancels editing
      setWorkingText(question.question);
      setWorkingOptions(question.options || []);
    } else {
      dispatch({
        type: 'SET_EDITING_QUESTION',
        payload: { questionId: question.id },
      });
      // Sync with the latest question values when entering edit mode
      setWorkingText(question.question);
      setWorkingOptions(question.options || []);
    }
  };

  // TODO: Students will add save functionality here
  const handleSave = () => {
    // Hint: Use UPDATE_QUESTION_TEXT action with workingText
    dispatch({
      type: 'UPDATE_QUESTION_TEXT',
      payload: { id: question.id, newText: workingText },
    });
    dispatch({ type: 'SET_EDITING_QUESTION', payload: { questionId: null } });
  };

  // TODO: Students will add delete functionality here
  const handleDelete = () => {
    // Hint: Show confirmation dialog, then use DELETE_QUESTION action
    if (window.confirm('Are you sure you want to delete this question?')) {
      dispatch({ type: 'DELETE_QUESTION', payload: { id: question.id } });
    }
  };

  const handleAddOption = () => {
    const newOption = window.prompt('Enter new option text:');
    if (newOption && newOption.trim() !== '') {
      dispatch({
        type: 'ADD_OPTION_TO_QUESTION',
        payload: { questionId: question.id, optionText: newOption.trim() },
      });
      // Update local state to immediately show the new input field during editing
      setWorkingOptions([...workingOptions, newOption.trim()]);
    }
  };

  const handleSaveOption = (index) => {
    dispatch({
      type: 'UPDATE_OPTION_TEXT',
      payload: {
        questionId: question.id,
        optionIndex: index,
        newText: workingOptions[index],
      },
    });
  };

  const handleDeleteOption = (index) => {
    dispatch({
      type: 'DELETE_OPTION_FROM_QUESTION',
      payload: { questionId: question.id, optionIndex: index },
    });
    // Remove the item from local state to update the UI immediately
    const newOpts = [...workingOptions];
    newOpts.splice(index, 1);
    setWorkingOptions(newOpts);
  };

  return (
    <div className={styles['question-item']}>
      <div className={styles['question-header']}>
        <span className={styles['question-type']}>
          Question Type: {formatQuestionType(question.type)}
        </span>
        <div className={styles['question-actions']}>
          {/* TODO: Students add Edit and Delete buttons here */}
          <button className={styles['edit-btn']} onClick={handleEdit}>
            {isEditing ? 'Cancel' : 'Edit'}
          </button>
          <button className={styles['delete-btn']} onClick={handleDelete}>
            Delete
          </button>
        </div>
      </div>

      {/* TODO: Students will add conditional controlled form to edit question here */}
      <div className={styles['question-content']}>
        {isEditing ? (
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <input
              type="text"
              value={workingText}
              onChange={(e) => setWorkingText(e.target.value)}
              style={{ flex: 1, padding: '5px' }}
            />
            <button
              onClick={handleSave}
              style={{ padding: '5px 15px', cursor: 'pointer' }}
            >
              Save
            </button>
          </div>
        ) : (
          <h3>{question.question}</h3>
        )}
      </div>

      {question.type === QUESTION_TYPES.MULTIPLE_CHOICE && (
        <div className={styles['options-section']}>
          <h4>Answer Options:</h4>
          <ul>
            {question.options.map((option, index) => (
              <li
                key={index}
                className={styles['option-item']}
                style={{ marginBottom: '8px' }}
              >
                {isEditing ? (
                  <div
                    style={{
                      display: 'flex',
                      gap: '10px',
                      alignItems: 'center',
                    }}
                  >
                    <input
                      type="text"
                      value={workingOptions[index] || ''}
                      onChange={(e) => {
                        const newOpts = [...workingOptions];
                        newOpts[index] = e.target.value;
                        setWorkingOptions(newOpts);
                      }}
                      style={{ padding: '3px', flex: 1 }}
                    />
                    <button
                      onClick={() => handleSaveOption(index)}
                      style={{ cursor: 'pointer' }}
                    >
                      Save
                    </button>
                    <button
                      onClick={() => handleDeleteOption(index)}
                      disabled={question.options.length <= 2}
                      style={{
                        cursor:
                          question.options.length <= 2
                            ? 'not-allowed'
                            : 'pointer',
                      }}
                    >
                      Delete
                    </button>
                  </div>
                ) : (
                  <span className={styles['option-text']}>{option}</span>
                )}
              </li>
            ))}
          </ul>
          {isEditing && (
            <button
              onClick={handleAddOption}
              style={{
                marginTop: '10px',
                padding: '5px 10px',
                cursor: 'pointer',
              }}
            >
              + Add Option
            </button>
          )}
        </div>
      )}
    </div>
  );
}
