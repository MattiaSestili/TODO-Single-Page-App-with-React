- Run npm start from cmd / powershell withing the folder to-do-react-spa.

NB: All the tasks have not been finished. The idea it was to record no just the action of the user(ADD, DELETE, UPDATE) 
but all the state changes. Therefore the input text changes and clicks events also. The logic was not completed as probably 
the best solution to store the state changes and write a less complicated and more mantianable code
would have be to use Redux and rely on its behaviour but I have never used before. So I have tried to use a different approach

Future improvements and changes:

- Add Redux to simplify the logic
- Refactoring the application: Separeting in different components Form and List and Buttons for the actions
  in order to have components that have their own state (would avoid un-necessary re-rendering)
- Add some generic component and logic to record no just Actions but the whole user interaction
