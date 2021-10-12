//
//  ContentView.swift
//  OrigamiStylesExample
//
//  Created by Fernando Ortiz - Parser on 17/09/2021.
//

import SwiftUI

struct ContentView: View {
    var body: some View {
        ZStack {
            Color
                .backgroundPage
                .edgesIgnoringSafeArea(.all)

            Image.logo
                .resizable()
                .frame(width: 200, height: 200)
        }
    }
}

struct ContentView_Previews: PreviewProvider {
    static var previews: some View {
        ContentView()
    }
}
